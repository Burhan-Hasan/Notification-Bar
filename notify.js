var Notify;
(function (Notify)
{
    var _settings = {
        sounds: {
            success: 'sounds/success,\ warning/1.mp3',
            warning: 'sounds/success,\ warning/3.mp3',
            error: 'sounds/errors/1.mp3'
        },
        animDuration: {
            success: 4000,
            warning: 4000,
            error: 4000
        }
    };
    Object.defineProperty(Notify, 'Settings', {
        get: function ()
        {
            return _settings;
        },
        set: function (settings)
        {
            if (!ValidateSettings(settings))
            {
                console.error('Settings not correct');
                return;
            }
            _settings.sounds = settings["sounds"] || _settings.sounds;
            _settings.animDuration = settings["animDuration"] || _settings.animDuration;
        }
    });

    //:::PUBLIC::://
    function Error(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = _settings.animDuration.error; }
        Show('error', message, autoCloseDuration, ShowNotificationBar('error'));
    }
    Notify.Error = Error;
    function Success(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = _settings.animDuration.success; }
        Show('success', message, autoCloseDuration, ShowNotificationBar('success'));
    }
    Notify.Success = Success;
    function Warning(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = _settings.animDuration.warning; }
        Show('warning', message, autoCloseDuration, ShowNotificationBar('warning'));
    }
    Notify.Warning = Warning;

    function Close(notify)
    {
        notify.classList.remove('active');
        notify.classList.remove('success');
        notify.classList.remove('error');
        notify.addEventListener('transitionend', function (e)
        {
            var parent = e.currentTarget.parentNode;
            if (e.propertyName != 'bottom' || parent == null) return;
            setTimeout(function ()
            {
                var childs = parent.getElementsByClassName('component-notify').length;
                if (childs === 0)
                    parent.remove();
            }, 0);

            e.currentTarget.remove();
        });
    }
    Notify.Close = Close;
    //:::PRIVATE::://

    function ShowNotificationBar(notificationType)
    {
        var wrapp = document.createElement('div');
        wrapp.className = 'component-notify';

        var textContent = document.createElement('div');
        textContent.className = '--text';
        var btnClose = document.createElement('div');
        btnClose.className = '--button-close';
        btnClose.addEventListener('click', function (e)
        {
            e.stopPropagation();
            var component = e.target.closest('.component-notify');
            Close(component);
        })
        btnClose.innerHTML = '<span>&#10006;</span>';

        wrapp.appendChild(textContent);
        wrapp.appendChild(btnClose);

        var container = document.getElementById('notify-container');
        if (!container)
        {
            container = document.createElement('div');
            container.id = 'notify-container';
            document.body.appendChild(container);
        }

        var audio = document.createElement('audio'),
                soundSRC = _settings.sounds[notificationType];
        audio.autoplay = 'autoplay';
        audio.className = 'notify-sound';
        audio.innerHTML = '<source src="' + soundSRC + '" type="audio/mpeg" />' +
                          '<embed hidden="true" autostart="true" loop="false" src="' + soundSRC + '" />';

        container.appendChild(audio);
        container.insertAdjacentElement("afterBegin", wrapp);
        return wrapp;
    }

    function Show(className, message, autoCloseDuration, notify)
    {
        message = message || "«сообщение не передано»";
        var mainContainer = notify.closest('#notify-container'),
            textContainer = notify.getElementsByClassName('--text')[0];
        textContainer.textContent = message;
        setTimeout(function ()
        {
            notify.classList.add('active');
            notify.classList.add(className);
        }, 0)

        if (autoCloseDuration)
            setTimeout(function () { Notify.Close(notify); }, autoCloseDuration);
    }

    function ValidateSettings(settings)
    {
        return true;
    }

})(Notify || (Notify = {}));