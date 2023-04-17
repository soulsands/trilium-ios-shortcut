const {req, res} = api;
let {title, content, labelString} = req.body;

if (req.method == "POST") {
    // try to create under a note with label - messageInbox, you can rename it .
    let messageInbox = api.getNoteWithLabel("messageInbox");
    if (!messageInbox) {
        // fallback to day note
        messageInbox = api.getDayNote(api.dayjs().format("YYYY-MM-DD"));
    }

    if (!title) {
        title = "from ios shortcut";
    }

    if (!content) {
        content = '';
    } else {
        // normalize \n from message
        content = content.split('\n').reduce((final, block) => {return final += `<p>${block}</p>`;}, '');
    }

    const {note} = api.createNewNote({
        parentNoteId: messageInbox.noteId,
        title,
        content,
        type: "text"
    });
    const labels = labelString.replace(/\n/g, '').split("#");
    const trimedLabels = labels.map(label => label.trim()).filter(label => label);
    if (trimedLabels.length) {
        trimedLabels.forEach((label) => {
            const [name, value] = label.split(' ');

            if (value) {
                note.setLabel(name, value);
            } else {
                note.setLabel(name);
            }
        });
    } else {
        note.setLabel("from ios shortcut");
    }

    res.status(200).json({code: 200, msg: "success", params: req.body});
}
