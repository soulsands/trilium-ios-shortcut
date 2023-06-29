const { req, res } = api;
if (req.method == "POST") {
    // try to create under a note with label - messageInbox, you can rename it .
    let messageInbox = api.getNoteWithLabel("messageInbox");
    if (!messageInbox) {
        // fallback to day note
        messageInbox = api.getDayNote(api.dayjs().format("YYYY-MM-DD"));
    }

    // text note
    let { content } = req.body;
    if (content !== undefined) {
        let { title, labelString = "" } = req.body;

        if (!content) {
            content = "";

            if (!title) {
                title = "from ios shortcut";
            }
        } else {
            if (!title) {
                title = content.slice(0, 20).replace("\n", " ");
            }

            // normalize \n from message
            content = content.split("\n").reduce((final, block) => {
                return (final += `<p>${block}</p>`);
            }, "");
        }

        const { note } = api.createNewNote({
            parentNoteId: messageInbox.noteId,
            title,
            content,
            type: "text",
        });

        const labels = labelString.replace(/\n/g, "").split("#");
        const trimedLabels = labels
            .map((label) => label.trim())
            .filter((label) => label);

        if (trimedLabels.length) {
            trimedLabels.forEach((label) => {
                const [name, value] = label.split(" ");

                if (value) {
                    note.setLabel(name, value);
                } else {
                    note.setLabel(name);
                }
            });
        } else {
            note.setLabel("from ios shortcut");
        }

        res.status(200).json({
            code: 200,
            msg: "success",
            params: req.body,
            result: note.getPojo(),
        });
        // files
    } else {
        const multer = require("multer");
        const importRoute = require("../routes/api/import");

        const multerOptions = {
            fileFilter: (req, file, cb) => {
                // UTF-8 file names are not well decoded by multer/busboy, so we handle the conversion on our side.
                // See https://github.com/expressjs/multer/pull/1102.
                file.originalname = Buffer.from(
                    file.originalname,
                    "latin1"
                ).toString("utf-8");
                cb(null, true);
            },
        };
        const uploadMiddleware = multer(multerOptions).single("upload");

        uploadMiddleware(req, res, () => {
            req.body.taskId = api.randomString(10);
            req.body.last = "true";
            req.params.parentNoteId = messageInbox.noteId;

            const options = {
                safeImport: "true", //  set to "false" (with quotes) if you don't need it, same below.
                shrinkImages: "true",
                textImportedAsText: "true",
                codeImportedAsCode: "true",
                explodeArchives: "true",
                replaceUnderscoresWithSpaces: "true",
            };

            req.body = { ...req.body, ...options };

            importRoute
                .importToBranch(req)
                .then((resualt) => {
                    res.status(200).json({
                        code: 200,
                        msg: "success",
                        params: req.body,
                        result: resualt,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        code: 500,
                        msg: "fail",
                        params: req.body,
                        error: err,
                    });
                });
        });
    }
}
