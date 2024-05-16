document.querySelectorAll('[id^="favbutton_"]').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action of following the link
        var link = this.href;
        var span = this.querySelector('span');
        
        // Toggle the href attribute
        if (link.includes('follow')) {
            this.href = link.replace('follow', 'unfollow');
        } else {
            this.href = link.replace('unfollow', 'follow');
        }
        
        // Toggle the color of the span
        if (span.style.color === 'red') {
            span.style.color = 'white';
        } else {
            span.style.color = 'red';
        }

        // Manually trigger the link
        window.location.href = this.href;
    });
});