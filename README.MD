#Order Up
A simple React Native app that mimicks a food delivery app

#### Process followed and assumptions made

This project was made using Expo init and utilized their provided Tabs boilerplate. I took this as an opportunity to play with Expo a little more, and as such they're maybe some extra files or unused functions in this codebase.

As directed I avoided using class components in favor of functional components. This also means that I used hooks heavily.

This project has 1 blatant, and apparently very difficult for me to fix, bug. That bug is that the Modal component used for adding an item to cart and for editing said item in cart, doesn't seem to want to listen to the transparency prop. I'm sure this will be something a second set of eyes would be able to debug very quickly.

The mock data provided for this challenge doesn't include IDs for each object, and as such I (perhaps foolishly) relied on the title strings for handling deletion and updating the objects in the redux store. As such, if there are 2 different instances of the same item in the cart (eg: French Fries appearing twice in the same cart), when you go to update or delete that item both instances will be modified/deleted.

This project could be expanded upon. For instance, adding a UID to objects to make a cleaner implementation of updating and deleting data from the redux store. If this application were to scale past the requirements of the challenge, it would also require some soft of unit and integration testing.

#####Be warned! This app was only tested on the iOS simulator. Experience and functionality on physical device or on android can't be assumed

####Running This app

#### Ensure you have all dependencies installed:

This project was built with Expo, using their default template for navigation and typescript. Assuming you have familiarity with React Native and a current development environment [see React Native Docs](https://reactnative.dev/docs/environment-setup) you'll only need to install expo.
