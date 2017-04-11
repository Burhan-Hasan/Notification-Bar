var Notify;
(function (Notify)
{
    function Error(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = 0; }
        Show('error', message, autoCloseDuration);
    }
    Notify.Error = Error;
    function Success(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = 4000; }
        Show('success', message, autoCloseDuration);
    }
    Notify.Success = Success;
    function Warning(message, autoCloseDuration)
    {
        if (autoCloseDuration === void 0) { autoCloseDuration = 4000; }
        Show('warning', message, autoCloseDuration);
    }
    Notify.Warning = Warning;
    function Clear()
    {
        var msgBox = document.getElementById('message-box');
        msgBox.className = 'active';
        msgBox.getElementsByClassName('msg')[0].textContent = '';
    }
    Notify.Clear = Clear;
    function Show(className, message, autoCloseDuration)
    {
        message = message || "«сообщение не передано»";
        var msgBox = document.getElementById('message-box'),
            isMsgTxtSmall = (message.length < 100) && message.indexOf('<br') == -1,
            msgContainer = msgBox.getElementsByClassName('msg')[0];
        msgContainer.innerHTML = message;
        if (isMsgTxtSmall)
        {
            msgContainer.classList.remove('big');
            msgBox.classList.remove('big');
        }
        else
        {
            msgContainer.addClass('big');
            msgBox.addClass('big');
        }
        msgBox.className = 'active';
        msgBox.classList.add(className);
        if (autoCloseDuration)
            setTimeout(function () { Notify.Close(msgBox); }, autoCloseDuration);
    }
    function Close(msgBox)
    {
        msgBox = msgBox || document.getElementById('message-box');
        msgBox.className = '';
    }
    Notify.Close = Close;
})(Notify || (Notify = {}));