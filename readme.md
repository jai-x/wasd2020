## wasd2020 NodeCg bundle

### Installation

* Have a working version of nodecg on the system
* Install `nodecg-speedcontrol` and `nodecg-tiltify` into `nodecg/bundles`
```shell
$ cd nodecg/bundles
$ git clone git@github.com:speedcontrol/nodecg-speedcontrol.git
$ git clone git@github.com:daniellockard/nodecg-tiltify.git
$ git clone git@github.com:EwanLyon/ncg-spotify.git
$ # and then run `npm install` inside each of these cloned directories
```
* Install this bundle into `nodecg/bundles` and then build resources
```shell
$ cd nodecg/bundles
$ git clone git@github.com:jai-x/wasd2020.git
$ cd nodecg/bundles/wasd2020
$ npm install
$ npm run build
```
* Update and symlink the config files in `nodecg/bundles/wasd2020/cfg`
```shell
$ nvim nodecg/bundles/wasd2020/cfg/* # edit and update the configs
$ ln -sf nodecg/bundles/wasd2020/cfg nodecg/cfg
```
* Run nodecg
```shell
$ cd nodecg/bundles/wasd2020
$ npm run nodecg
```
