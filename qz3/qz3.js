document.addEventListener('keydown',logkey)
function logkey(x)
{
    document.getElementById('in').innerHTML+=x.key;
}