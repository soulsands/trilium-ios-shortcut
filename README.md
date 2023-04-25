# trilium-ios-shortcut

[中文](./README.zh_cn.md)

A Guide to Sending Messages to Trilium via Apple Shortcuts

## Prerequisites

To use this guide, you will need:

-   An Apple device with the Shortcuts app installed.
-   A Trilium server installed.

This guide has been tested with iOS 15.5, but may also work with iOS 13. Feedback is appreciated.

## Features of the shortcut:

This shortcut allows you to:

-   Type and send text content.
-   Select and save any text content for sharing.
-   Support voice input（already supported by the default keyborad, can be turned off).
-   Support for reading clipboard content and sending it; can be configured to enable or disable. After reading the clipboard, four options are available:
    -   Clear clipboard
    -   Quote clipboard content
    -   Quote clipboard content (clear after success)
    -   Input directly
-   Support sending photos
-   Support sending copied files
-   Support for configuring fixed titles; fixed titles are used directly after configuration.
-   Support for configuring optional titles; select "custom" to manually enter the title.
-   Multiple default labels can be set; notes sent will be accompanied by default labels after being set.
-   Labels support both individual #name and #name=value.
-   Configurable optional label groups; supports enabling or disabling labelgroup selection.
-   If sending fails, you can choose to save it to the clipboard or Apple notes.

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
3. Add a tag `#customRequestHandler={any_string}`.
4. Copy the code from the [handler](./handler.js) file into the note.

This creates an API that can be used to create notes. The request path to fill in the shortcut is `{your web server path}/custom/{the any_string setted early}`.

### Apple device

1. Open links on your mobile device to get the shortcut.
   1. [text note](https://www.icloud.com/shortcuts/a7b7a88e67024d00a3b1d2e43306898b) 
   2. [file note](https://www.icloud.com/shortcuts/338e4922664c4d9cb3e60c78a782ff10)

2. Follow the instructions to install and configure the shortcut.
3. If prompted for permissions, grant them.

### Done!

You can now enjoy sending messages to your Trilium server anytime, anywhere!

## Usage Tips

This shortcut provides very flexible usage methods.

-   If you just want to quickly send content without dealing with titles and labels, you can enable fixed titles and configure default labels, and then disable the "selectLabels" option.
-   If you want to modify the title and labels before sending, you can disable fixed titles and enable "selectLabels", which will provide a very flexible input experience.

When entering the body text, you can choose to directly input or use quoted input, and the source of the quote can be system input or clipboard content. When using quoted input, the command will use `---` as a separator. You can also modify the quoted input method in the shortcut.

You can add the shortcut to the main screen or to the assistive touch. To add it to the assistive touch, go to `Settings-Accessibility-Assistive Touch`.

When using the system share function, you can find the shortcut and add it to your favorites. This way, you can pin it to the top in the edit menu for easier access.

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
