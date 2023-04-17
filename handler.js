const {req, res} = api;
let {title, content, labelString} = req.body;

if (req.method == "POST") {
    // try to create under a note with label - messageInbox, you can rename it .
    let messageInbox = api.getNoteWithLabel("messageInbox");
    // fallback to day note
    if (!messageInbox) {
        messageInbox = api.getDayNote(api.dayjs().format("YYYY-MM-DD"));
    }

    if (!title) {
        title = "from ios shortcut";
    }

    if (!content) {
        throw new Error("message content is empty");
    }

    // normalize \n from message
    const finalContent = content.split('\n').reduce((final, block) => {return final += `<p>${block}</p>`;}, '');

    const {note} = api.createNewNote({
        parentNoteId: messageInbox.noteId,
        title,
        content: finalContent,
        type: "text"
    });

    const labels = labelString.replace(/\n/g, '').split("#")
    const hasLabel = labels.some(label => !!label.trim())
    if (hasLabel) {
        labels.forEach((label) => {
            if (label.trim()) {
                note.setLabel(label.trim());
            }
        });
    } else {
        note.setLabel("from ios shortcut");
    }

    res.status(200).json({code: 200, msg: "success", params: req.body});
}
