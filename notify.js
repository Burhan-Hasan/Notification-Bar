var Notify;
(function (Notify)
{
    var _autoCloseDuration = 4000;
    //:::PUBLIC::://
    function Error(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = 0; }
        Show('error', message, autoCloseDuration, ShowNotificationBar());
    }
    Notify.Error = Error;
    function Success(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = _autoCloseDuration; }
        Show('success', message, autoCloseDuration, ShowNotificationBar());
    }
    Notify.Success = Success;
    function Warning(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = _autoCloseDuration; }
        Show('warning', message, autoCloseDuration, ShowNotificationBar());
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

    function ShowNotificationBar()
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
                filename = '1';
        audio.autoplay = 'autoplay';
        audio.className = 'notify-sound';
        audio.innerHTML = '<source src="sounds/' + filename + '.mp3" type="audio/mpeg" />' +
                            '<source src="' + filename + '.ogg" type="audio/ogg" />' +
                            '<embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" />';

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
})(Notify || (Notify = {}));