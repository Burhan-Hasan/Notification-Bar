var Notify;
(function (Notify)
{
    function CreateNotifyDOM()
    {
        var wrapp = document.createElement('div');
        wrapp.className = 'component-notify';

        var textContent = document.createElement('div');
        textContent.className = '--text';
        var btnClose = document.createElement('div');
        btnClose.className = '--button-close';
        btnClose.addEventListener('click', function (e)
        {
            var component = e.target.closest('.component-notify');
            component.classList.remove('active');
            component.classList.remove('success');
            component.classList.remove('error');
        })
        btnClose.innerHTML = '<span>&#10006;</span>';

        wrapp.appendChild(textContent);
        wrapp.appendChild(btnClose);

        return wrapp;
    }

    function Error(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = 0; }
        var notifyDOM = CreateNotifyDOM();
        document.body.appendChild(notifyDOM);
        Show('error', message, autoCloseDuration, notifyDOM);
    }
    Notify.Error = Error;
    function Success(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = 4000; }
        var notifyDOM = CreateNotifyDOM();
        document.body.appendChild(notifyDOM);
        Show('success', message, autoCloseDuration, notifyDOM);
    }
    Notify.Success = Success;
    function Warning(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = 4000; }
        var notifyDOM = CreateNotifyDOM();
        document.body.appendChild(notifyDOM);
        Show('warning', message, autoCloseDuration, notifyDOM);
    }
    Notify.Warning = Warning;
    function Clear()
    {
        var msgBox = document.getElementById('component-notify');
        msgBox.className = 'active';
        msgBox.getElementsByClassName('--text')[0].textContent = '';
    }
    Notify.Clear = Clear;
    function Show(className, message, autoCloseDuration,notify)
    {
        message = message || "«сообщение не передано»";
        var isMsgTxtSmall = (message.length < 100) && message.indexOf('<br') == -1,
            msgContainer = notify.getElementsByClassName('--text')[0];
        msgContainer.innerHTML = message;
        if (isMsgTxtSmall)
        {
            msgContainer.classList.remove('big');
            notify.classList.remove('big');
        }
        else
        {
            msgContainer.addClass('big');
            notify.addClass('big');
        }
        setTimeout(function ()
        {
            notify.classList.add('active');
            notify.classList.add(className);
        },0)
        
        if (autoCloseDuration)
            setTimeout(function () { Notify.Close(notify); }, autoCloseDuration);
    }
    function Close(notify)
    {
        notify.classList.remove('active');
        notify.classList.remove('success');
        notify.classList.remove('error');
    }
    Notify.Close = Close;
})(Notify || (Notify = {}));