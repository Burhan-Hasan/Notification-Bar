### Notification Bar
[VIEW DEMO](https://burhan-hasan.github.io/Notification-Bar/)

<img style="width:80%;max-width:650px;display:block;margin:0 auto" src="https://cloud.githubusercontent.com/assets/6553878/26123583/74a1f3aa-3a8c-11e7-9324-0ce7bc860418.png">

## Useage

There're three types of notification
---
*1. Success*
```sh
    Notify.Success( message [, autoCloseDuration ]);
```
*2. Warning*
```sh
    Notify.Warning( message [, autoCloseDuration ]);
```
*3. Error*
```sh
    Notify.Error( message [, autoCloseDuration ]);
```

## Settings
To change the settings, you need to set a options value to the property "Settings" of Notify object.

**For example**
```sh
Notify.Settings = {
                sounds: {
                    success: 'sounds/success,\ warning/5.mp3',
                    warning: 'sounds/success,\ warning/2.mp3',
                    error: 'sounds/errors/1.mp3'
                },
                animDuration: {
                    success: 8000,
                    warning: 8000,
                    error: 0
                }
            };
```
You can set also  one option only. In this case, the default value for sounds will not be deleted.
```sh
Notify.Settings = {
                animDuration: {
                    success: 8000,
                    warning: 8000,
                    error: 0
                }
            };
```
If the duration of the animation is set to 0, then this notification will not closing automatically.

If you want to turn off the sounds then set to the property soundsOff to true
```sh
Notify.Settings = {
                soundsOff: false,
                animDuration: {
                    success: 8000,
                    warning: 8000,
                    error: 8000
                }
            };
```
