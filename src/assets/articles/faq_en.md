// This is an ugly hack to enable import of md files
let md = `

# Welcome to Ohana!

Here you'll find a quick guide about how to use Ohana. This is:

[[toc]]

<h1 id="get-started"></h1>

## What do the colors and icons mean?

We use a simple "traffic light" system to quicktly let you know if a movie is healthy for your settings:

<b style="color:green">Healthy:</b> This movie is healthy to watch! Either because it doesn't have any unhealthy scenes, or because they can be removed <i class="v-icon mdi mdi-content-cut green--text"></i> with the magic of our [Chrome Extension](faqs#how-to-install)<br>

<b style="color:orange">Mixed: <i class="small v-icon mdi mdi-flag-variant orange--text"></i></b> Edge or mixed content case. Some users say it is healthy, others say it is not...<br>

<b style="color:red"> Unhealthy: <i class="v-icon mdi mdi-flag-variant red--text"></i></b> This movie includes unhealthy scenes or values you have told us you want to skip<br>

<b style="color:gray">Unknown: <i class="v-icon mdi mdi-progress-question lightgray--text"></i></b> We try our best, but in some cases we must admit we don't have all the anwsers :)

## How to enjoy a healthy movie

#### Step 1. Define what content you want to avoid

With Ohana, you choose what to watch and what to skip. These settings will be used all around to customize your Ohana experience. If you haven't done that already [manage your preferences](/settings)

#### Step 2. Find a good healthy movie to watch

Check our [great catalog](/) to discover healthy movies. You can discover healthy movies by genre, fostered values, popularity... You can also search by title if you want to check whether a given movie is healthy or not to watch.

#### Step 3. Enjoy the movie!

Grab some popcorn an enjoy the movie! We will skip any unhealthy content for you!

#### Step 5. Pro tip (Ohana Extension)

If the movie has unhealthy scenes to be removed <i class="v-icon mdi mdi-content-cut green--text"></i>, our powerful [Chrome Extension](faqs#how-to-install) will automagically remove them for you :)

Moreover, While watching a movie, a floating header will let you know if, based on your settings, that movie is safe to watch. If you click on the header, you will see a more in depth explanation of the movie content.

<h1 id="start-editing"></h1>

## How to create new filters

#### Step 1. Get ready

Make sure you have Ohana installed, grab some pocorn, and start watching the movie/episode you want to create filters for.

#### Step 2. Open the editor's sidebar

Click on the Ohana floating header that you see on the top centre of the screen. A sidebar will open. Follow the instructions to login/register and become an Ohana editor!

When you first register you will join as a _Young Padawan_, as you grow in the use of Ohana and increase your community recognition, you will progress into a _Jedi Master_ with full editing powers!

#### Step 3. Create filters

While watching the movie/show, whenever you spot anything you want to flag, press the "New filter" button or the keyboard shortcut "Alt + N".

To protect you from unhealthy content, while adding a scene the video will get muted and a bit blurred. You can control this behaviour with the 'blur on mark' and 'mute on mark' inputs.

To mark the end of an unhealthy scene press "End filter" or "Alt + N". A popup asking you to fine tune the filter will open.

#### Step 4. Fine tune filters

Follow the instrucctions on the popup to fine tune the created filter. This includes two main steps:

1. Let us know why this scene is unhealthy, so that other users can decide whether to watch it or to skip it
2. Fine tune the times. Remember it is always better to skip a few extra seconds around the unhealthy content, to make the edit more natural

#### Step 5. Set filter status

Repeat steps 3 and 4 until all the unhealthy scenes have been added. Last but not least, it is importat to update the filter status to let everyone know this movie is now safe to watch!

Click the "Set filter status" button and select, for each category & tag, the right status. Click on save and you are done! Now everyone in the world can enjoy a healthy movie/episode! In the name of everyone: **Thank you, you are a hero!**

<h1 id="about"></h1>

## What is Ohana?

![](images/means-family.jpg)

Ohana is an open community of families and movie fans like you that share a passion for great healthy movies.

Ohana is the Wikipedia of movie values and content filters, providing free access to tools, data and knowledge that enable its users to easily find and enjoy movies in a healthy way.

Our Chrome extension embeds itself within Netflix, HBO, etc. enabling users to skip those scenes they do not want to watch. With Ohana you decide what to watch and what to skip!

If you enjoy great movies, but don't like watching unhealthy scenes, you will be pleased to meet Ohana.

## Why choosing what to watch?

#### Values

It is no secret that movies, as an expression of the human spirit, portray a world-view and a set of values (social justice, women's rights, self-giving love... but also sexism, racism, revenge...). Some key ideas:

- The younger the audience, the easier these ideas shape our own world-view, but studies show that no one is immune to a constant bombardment of toxic content.
- Post-film discussions and reflections make us aware of the promoted values. Changing (or inverting) the influence of the movie, and if we change our world view, making it a conscious decision.
- Positive values do not mean simplistic or easy to watch. A movie about genocides or sexual abuses might be disturbing, showing the worse humans can do... but if it is respectful and condemns the actions, while maybe showing examples of healing or repentance and reconciliation. While peaceful animation movies might promote any kind of ideology.

#### Graphic content

In some cases, it is not about the ideas, but about graphic or explicit content depicted in the movie. Here it does not matter how mature the viewer is, nor how much discussion you have afterwards. Watching the scene itself is unhealthy. Some reasons for this might be:

- Graphic violence & gore. Depending on your sensitivity, these scenes can ruin a good movie, or trigger flashbacks on people suffering from trauma...
- Sex & nudtiy. If you believe people should be loved, not used; and want to approach sex as a way of showing love/giving yourself to the other person. Thus we try to avoid using other people (either physically or on a video) as a tool to obtain pleasure.

## How do you help people?

In Ohana we want to:

1. Promote creation, visibility and ease of access to good movies
2. Give everyone the freedom to skip unwanted graphic or explicit scenes
3. Promote discussion and awareness about movies & values

We do so with two key principles in mind:

1. Freedom. You decide what to watch and what to skip
2. Community. We are no big corporation, but a community of users. This gives us the freedom to care about good quality content (instead of profit), while providing free access thanks to the collaboration and donations of our community.

## What do you do to help?

We try to help families and users enjoy movies in all possible ways, so far we:

1. Run this website with movie recommendations based on users preference (style, type of scenes to remove...)
2. Provide information about values and graphic or explicit content on movies
3. Promote discussion by providing reviews and resources for post-film discussions, helping people dig deeper...
4. Allow people to skip scenes, by providing a chrome extension that enables users to filter out the scenes they do not want to watch. Tools to skip graphic or explicit content on movies and tv series.
5. Promote the creation of healthy movies. By giving visibility to healthy content By bringing the discussion about content to the public
6. Pave the way for future projects by providing an open API where people can find good content and access filters

<!--5. Add an extra layer to different platforms (eg. on Netflix, justwatch... add icon with type of content)-->

## How is Ohana organised

We have a small hard working team developing the tools, fine tuning the user experience...

A larger group of editors and volunteers, creating content such as classifying movie values, providing reviews and creating scene filters

A larger group of users, families and movie fans, that enjoy watching great healthy movies. Their biggest contribution is using Ohana to enjoy great healthy movies (purpose) but, whenever possible, they also contribute financially to the project.

## How can I help?

Ohana is a non-profit community of users providing a free service to society. This is made possible thanks to the support of our members. Find out [ways to support our mission](/community)

<h2 id="how-to-install">What is "Ohana Extension" and how can I get it?</h2>

Ohana Extension is our powerful Google Chrome Extension, that will give you the power to automagically skip unwanted scenes on the moview you watch.

To install Ohana visit our page at the [Google Chrome Store](https://chrome.google.com/webstore/detail/ohana-tv/nfkbclgkdifmoidnkapblfipbdkcppcf) and click on 'Add to Chrome' to install it.

## Can I use Ohana without Chrome?

No to skip unhealthy scenes automatically. But you can still leverage on our website to find content that can be wathed without skips. Just take a look at our Content page.

## What content can I skip with Ohana?

First of all, remember with Ohana TV you hold to power, you decide what to watch and what to skip. What we work hard to do, is to classify the content so you can actually take the decision of skipping certain content.

To change your settings, go to: [settings](/settings)

`

module.exports = {
md
}
