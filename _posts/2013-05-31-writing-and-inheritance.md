---
published: false
layout: post
title: Writing and Inheritance
intro: On writing with humanity and inheritance
---

"Any time you can tell a story in the form of a quest or a pilgrimage....readers bearing their own associations will do some of your work for you." - William Zinsser

As a writer, don't focus on the final product. Even if you are trying to sell it. Rather, focus on finding that deeper place in your story. Tell the humanity in your story.

Now, onto a different topic. When designing an application using inheritance, use the template method pattern to have the subclasses of your abstract superclasses provide the specialization needed.
Also, because it is so easy to over-couple classes in an inheritance hierarchy, use hooks instead of sending super to have the subclasses provide their specializations.
Reducing coupling between superclasses and their children makes the application design more tolerable to change.