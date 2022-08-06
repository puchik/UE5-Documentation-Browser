# UE5 Documentation Browser
 A simple electron-based app used for browsing the UE5 documentation which you can pin on top of all windows.

 ![](https://puchik.now.sh/images/ue5-docs-post/app.jpg)

While navigating the painful experience of getting an IDE that works well with unreal engine, I found a neat [UnrealVsCodeHelper](https://github.com/hcabel/UnrealVsCodeHelper) extension that had a built in browser for the documentation. I'm still not entirely convinced on using VS Code for UE (yet?), but I did really enjoy this idea and would have liked it to have it in Visual Studio.

I decided to quickly built an electron app that is basically a cut-down glorified web browser that lets you browse the UE docs.

Opening a separate browser window can get kind of painful if you want the docs on hand. Open it, search for the docs or use a bookmark, have a bunch of other tabs or windows open, go back manually when you're done looking for something, need to keep switching windows...

![](https://puchik.now.sh/images/ue5-docs-post/using-a-browser.gif)

Conversely, this one opens directly to the C++ API, removes various headers and footers or things that could otherwise clutter the page, and lets you search directly. You can also pin it on top of all windows and scale it however you like.

![](https://puchik.now.sh/images/ue5-docs-post/using-the-app.gif)

![](https://puchik.now.sh/images/ue5-docs-post/app-scaling.gif)

Is it janky? Kind of! Does it have hardcoded strings and element IDs? Yes! Does it work? Also yes!

## Known issues
* If you change the window width by a large amount after opening the home page, some of the main navigation buttons that are removed (like the forum search) will return. They are deleted again after refreshing the page.

* You tell me.

