# trilium-ios-shortcut

[中文](./README.zh_cn.md)

A Guide to Sending Messages to Trilium via Apple Shortcuts

## Prerequisites

To use this guide, you will need: 

- An Apple device with the Shortcuts app installed.
- A Trilium server installed.

This guide has been tested with iOS 15.5, but may also work with iOS 13. Feedback is appreciated. 

## Features of the shortcut:

 This shortcut allows you to: 

- Type and send text content.
- Select and save any text content for sharing.
- Support for reading clipboard content and sending it; can be configured to enable or disable. After reading the clipboard, four options are available:
  - Clear clipboard
  - Quote clipboard content
  - Quote clipboard content (clear after success)
  - Input directly
- Support for configuring fixed titles; fixed titles are used directly after configuration.
- Support for configuring optional titles; select "custom" to manually enter the title.
- Multiple default labels can be set; notes sent will be accompanied by default labels after being set.
- Labels support both individual #name and #name=value.
- Configurable optional label groups; supports enabling or disabling labelgroup selection.

## Custom API:

To learn more about the custom API, please see the [documentation](https://github.com/zadam/trilium/wiki/Custom-request-handler). 

This feature is more powerful than what is displayed in the documentation, as it can directly import files from the project.

```js
const htmlSanitizer = require("../services/html_sanitizer");
```

This method can be used to access unexposed features, but may also cause some unexpected behavior.

## Custom request handler file

 To create a custom request handler file, please use the [handler](./handler.js). This is the most basic method, but you can also create your own logic, such as adding a clone. 

## Instructions

### Trilium server

1. First create a new note or use an existing one.
2. Change the type to `JS backend`.
3. Add a tag `#customRequestHandler={any_address}`.
4. Copy the code from the [handler](./handler.js) file into the note.

This creates an API that can be used to create notes.

### Apple device

1. Open [this link](https://www.icloud.com/shortcuts/b04a8d3574b543c3ae35ff74bd772d6b) on your mobile device to get the shortcut.
2. Follow the instructions to install and configure the shortcut.
3. If prompted for permissions, grant them.

### Done!

You can now enjoy sending messages to your Trilium server anytime, anywhere!

## Tips for Writing Shortcuts

Writing shortcuts can be inconvenient, as dragging and dropping can be buggy and accidentally deleting a node is easy.

If you need to make changes, it is recommended to use "copy" and "paste above/below".

Undo is available in the bottom left corner, so use it if things don't go as planned.

It is also recommended to copy the shortcut at key points to back it up.

If you experience lag during editing, try exiting and re-entering the app.

If a shortcut works when written, but does not function when executed, restarting your phone may be necessary.

As it can be difficult to modify shortcuts after writing them, it is recommended to implement pseudocode first and clarify the logic before writing the shortcut on your phone.

You can also refer to other people's shortcuts and use "copy" frequently if you have similar requirements.

## End

This shortcut is only available for publishing or updating here and is not responsible for other sources.

If you have any questions or suggestions, please submit an issue.

If it is helpful to you, feel free to star it.
