# ReactNativeTest

This is basic demo of react native using GraphQLHub Reddit for data.

### Code Setup

```sh
$ git clone https://github.com/NikhilVashistha/ReactNativeTest.git
$ cd ReactNativeTest
$ npm install
```

### For running app

**ios**
```sh
$ react-native run-ios
```

**android**
```sh
$ react-native run-android
```

### Components

**App** - It is top level component contains AppNavigator.

**AppNavigator** - It is a component used for navigation in app. It contains all the screens to navigate. By default it will show ListScreen. It is included in App.js.For app navigation pupose i am using [react-navigation](https://reactnavigation.org/).

**List** - It is a component used for showing the list of SubReddit movies title.

**ListeItem** - It is a stateless component used for showing the SubReddit each movie title in List component.

**ListDetail** - It is a component used for showing the details of particular SubReddit movie.