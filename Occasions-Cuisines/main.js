var currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

const occasions = {
    "Thanksgiving": getEventDate(currentDate,"Thanksgiving"),
    "Halloween": getEventDate(currentDate,"Halloween"),
    "Diwali": getEventDate(currentDate,"Diwali"),
    "St Patrick": getEventDate(currentDate,"St Patrick"),
    "Cinco De Mayo": getEventDate(currentDate,"Cinco De Mayo"),
    "Oktoberfest": getEventDate(currentDate,"Oktoberfest"),
    "Ramadan": getRamadanDate(currentDate),    
    "Easter": getEasterDate(currentDate),    
    "Lunar New Year": getLunarDate(currentDate),    
};

function getEventDate(date, event){
    const Dates = {
        "Thanksgiving": new Date(`November 28 ${currentDate.getFullYear()} UTC`),
        "Halloween": new Date(`October 31 ${currentDate.getFullYear()} UTC`),
        "Diwali": new Date(`November 4 ${currentDate.getFullYear()} UTC`),
        "St Patrick": new Date(`March 17 ${currentDate.getFullYear()} UTC`),
        "Cinco De Mayo": new Date(`May 5 ${currentDate.getFullYear()} UTC`),
        "Oktoberfest": new Date(`September 20 ${currentDate.getFullYear()} UTC`)
    };
    
    let tdate = Dates[event];
    if(tdate < currentDate ) tdate.setFullYear(tdate.getFullYear()+1);
    tdate.setUTCHours(0, 0, 0, 0);
    return tdate ;
}

function getRamadanDate(date) {
    const ramadanEndDates = [
        new Date("2025-03-31"),
        new Date("2026-03-20"),
        new Date("2027-03-10"),
        new Date("2028-02-27"),
        new Date("2029-02-15"),
        new Date("2030-02-04"),
        new Date("2031-01-25"),
        new Date("2032-01-14"),
        new Date("2033-01-03"),
        new Date("2033-12-23"),        
        new Date("2034-12-12"),

    ];
    return ramadanEndDates.find(ramadanDate => ramadanDate >= date);
}


function getLunarDate(date) {
    const LunarDates = [
        new Date("2025-01-29"),
        new Date("2026-02-17"),
        new Date("2027-02-06"),
        new Date("2028-01-26"),
        new Date("2029-02-13"),
        new Date("2030-02-03"),
        new Date("2031-01-23"),
        new Date("2032-02-11"),
        new Date("2033-01-31"),
        new Date("2034-02-19"),
    ];
    return LunarDates.find(LunarDate => LunarDate >= date);
}

function getEasterDate(date) {
    const EasterDates = [
        new Date("2025-04-20"),
        new Date("2026-04-05"),
        new Date("2027-03-28"),
        new Date("2028-04-16"),
        new Date("2029-04-01"),
        new Date("2030-04-21"),
        new Date("2031-04-13"),
        new Date("2032-03-28"),
        new Date("2033-04-17"),
        new Date("2034-04-09"),
    ];
    
    return EasterDates.find(EasterDate => EasterDate >= date);
}


function updateTimer() {
    
    countdowns = document.getElementsByClassName("countdown");
    
    for(let i=0; i<countdowns.length; i++){
        
        let targetDate = occasions[ countdowns[i].id ];
        let differenceInTime = targetDate.getTime() - new Date().getTime();

        let days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((differenceInTime % (1000 * 60)) / 1000);        
    
        if(days==0 || (days<=30 && countdowns[i].id=="Ramadan")){
            countdowns[i].innerHTML = 
            `Happy ${countdowns[i].id}!`;
            continue;
        }

        countdowns[i].innerHTML = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    setTimeout(updateTimer, 1000);
}

updateTimer();

const logo = document.getElementById('logo');

logo.addEventListener('click', function() {
    window.location.href = '../Home_page/Home Page.html'; 
});
