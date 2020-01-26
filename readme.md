## wasd2020 NodeCg bundle

### Installation

* Have a working version of nodecg on the system
* Install `nodecg-speedcontrol` and `nodecg-tiltify` into `nodecg/bundles`
```shell
$ cd nodecg/bundles
$ git clone git@github.com:speedcontrol/nodecg-speedcontrol.git
$ cd nodecg/bundles/nodecg-speedcontrol
$ npm install
$ cd nodecg/bundles
$ git clone git@github.com:daniellockard/nodecg-tiltify.git
$ cd nodecg/bundles/nodecg-tiltify
$ npm install
```
* Install and build this bundle into `nodecg/bundles`
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
