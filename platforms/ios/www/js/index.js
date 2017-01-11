$(document).ready(function() {
    if (!localStorage.coinCount) {
        localStorage.coinCount = 0;
    }
    if (!localStorage.starCount) {
        localStorage.starCount = 15;
    }
    hillLevelHTML = $("#hillLevel").html();
    menuHTML = $("#mainScreen1").html();
    menu2HTML = $("#mainScreen2").html();
    storeHTML = $("#storeScreen").html();
    TouchEmulator();
    loadMenu();
});

function makeTranslucent() {
    $(this).css("opacity", "0.7");
}

function makeOpaque() {
    $(this).css("opacity", "1");
}

function unBindHandlers() {
    $(document).add('*').off();
}

function refreshHover() {
    $(".btnHover").off("touchstart", makeTranslucent);
    $(".btnHover").off("touchend", makeOpaque);
    $(".btnHover").on("touchstart", makeTranslucent);
    $(".btnHover").on("touchend", makeOpaque);
}

var pointerEventToXY = function(e){
      var out = {x:0, y:0};
      if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        out.x = touch.pageX;
        out.y = touch.pageY;
      } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        out.x = e.pageX;
        out.y = e.pageY;
      }
      return out;
    };

function allElementsFromPoint(x, y, ele) {
    var element, elements = [];
    var old_visibility = [];
    var isFound = false;
    while (true) {
        element = document.elementFromPoint(x, y);
        if (!element || element === document.documentElement) {
            break;
        }
        if (element == ele) {
            isFound = true;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }
    elements.reverse();
    
    return isFound;
}

function didEndInside(element, callback) {
    var isSelected = false;
    $(element).on("touchmove", function(e) {
        var mousePOS = pointerEventToXY(e);
        if (!allElementsFromPoint(mousePOS.x, mousePOS.y, document.getElementById(element.attr("id")))) {
            isSelected = false;
        }
    });
    $(element).on("touchstart", function() {
        isSelected = true;
    });
    $(element).on("touchend", function() {
        if (isSelected) {
            $(element).off("touchmove");
            $(element).off("touchstart");
            $(element).off("touchend");
            callback.call();
        }
    });
}

function didEndInsidePerm(element, callback) {
    var isSelected = false;
    $(element).on("touchmove", function(e) {
        var mousePOS = pointerEventToXY(e);
        if (!allElementsFromPoint(mousePOS.x, mousePOS.y, document.getElementById(element.attr("id")))) {
            isSelected = false;
        }
    });
    $(element).on("touchstart", function() {
        isSelected = true;
    });
    $(element).on("touchend", function() {
        if (isSelected) {
            callback.call();
        }
    });
}

function getTimeString(ms) {
    var minutes = Math.round((ms % 3600000)/60000);
    if (ms >= 3600000) {
        var hours = Math.round((ms - (ms % 3600000))/3600000);
    } else {
        var hours = 0;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    } else if (minutes == 60) {
        minutes = "00";
        hours += 1;
    }
    return hours + ":" + minutes + " Remaining";
}

function openCrateOne(crateType) {
    $("#crateOneSection").css("z-index", 40);
    var cloneOf = $("#c1FinishedIMG").clone().appendTo("#menuOneSectionTwo").css({height: "14.23%", left: "24%", top: "51.4%"});
    $("#c1FinishedIMG").hide();
    if (crateType == "bronze") {
        var amount = 5000;
    } else if (crateType == "silver") {
        var amount = 10000;
    } else if (crateType == "gold") {
        var amount = 15000;
    } else if (crateType == "space") {
        var amount = 25000;
    }
    $(cloneOf).animate({height: "50%", left: "50%", top: "50%"}, 400, function() {
        $(cloneOf).attr("src", "img/"+crateType+"CrateOpen.png");
        $("#coinAmount").attr("src", "img/"+amount+"coin.png");
        $("#coinAmount").fadeIn(200);
        localStorage.crate1 = localStorage.crate2;
        localStorage.crate2 = localStorage.crate3;
        localStorage.crate3 = localStorage.crate4;
        localStorage.crate4 = "";
        $("#crateOneSection").off();
        $("#crateTwoSection").off();
        $("#crateThreeSection").off();
        $("#crateFourSection").off();
        hasAddedC1Checker = false;
        hasAddedC2Checker = false;
        hasAddedC3Checker = false;
        hasAddedC4Checker = false;

        hasAddedC1RushChecker = false;
        hasAddedC2RushChecker = false;
        hasAddedC3RushChecker = false;
        hasAddedC4RushChecker = false;
        didEndInside($("#menuOneSectionTwo"), function() {
            $(cloneOf).fadeOut(400, function() {
                $(cloneOf).remove();
            });
            $("#coinAmount").fadeOut(400);
            localStorage.coinCount = Number(localStorage.coinCount) + amount;
            $("#coinVal").html(localStorage.coinCount);
        });
    });
}

function openCrateTwo(crateType) {
    $("#crateTwoSection").css("z-index", 40);
    var cloneOf = $("#c2FinishedIMG").clone().appendTo("#menuOneSectionTwo").css({height: "14.23%", left: "41.2%", top: "51.4%"});
    $("#c2FinishedIMG").hide();
    if (crateType == "bronze") {
        var amount = 5000;
    } else if (crateType == "silver") {
        var amount = 10000;
    } else if (crateType == "gold") {
        var amount = 15000;
    } else if (crateType == "space") {
        var amount = 25000;
    }
    $(cloneOf).animate({height: "50%", left: "50%", top: "50%"}, 400, function() {
        $(cloneOf).attr("src", "img/"+crateType+"CrateOpen.png");
        $("#coinAmount").attr("src", "img/"+amount+"coin.png");
        $("#coinAmount").fadeIn(200);
        localStorage.crate2 = localStorage.crate3;
        localStorage.crate3 = localStorage.crate4;
        localStorage.crate4 = "";
        didEndInside($("#menuOneSectionTwo"), function() {
            $(cloneOf).fadeOut(400, function() {
                $(cloneOf).remove();
            });
            $("#coinAmount").fadeOut(400);
            localStorage.coinCount = Number(localStorage.coinCount) + amount;
            $("#coinVal").html(localStorage.coinCount);
        });
        $("#crateOneSection").off();
        $("#crateTwoSection").off();
        $("#crateThreeSection").off();
        $("#crateFourSection").off();
        hasAddedC1Checker = false;
        hasAddedC2Checker = false;
        hasAddedC3Checker = false;
        hasAddedC4Checker = false;

        hasAddedC1RushChecker = false;
        hasAddedC2RushChecker = false;
        hasAddedC3RushChecker = false;
        hasAddedC4RushChecker = false;
    });
}

function openCrateThree(crateType) {
    $("#crateThreeSection").css("z-index", 40);
    var cloneOf = $("#c3FinishedIMG").clone().appendTo("#menuOneSectionTwo").css({height: "14.23%", left: "58.6%", top: "51.4%"});
    $("#c3FinishedIMG").hide();
    if (crateType == "bronze") {
        var amount = 5000;
    } else if (crateType == "silver") {
        var amount = 10000;
    } else if (crateType == "gold") {
        var amount = 15000;
    } else if (crateType == "space") {
        var amount = 25000;
    }
    $(cloneOf).animate({height: "50%", left: "50%", top: "50%"}, 400, function() {
        $(cloneOf).attr("src", "img/"+crateType+"CrateOpen.png");
        $("#coinAmount").attr("src", "img/"+amount+"coin.png");
        $("#coinAmount").fadeIn(200);
        localStorage.crate3 = localStorage.crate4;
        localStorage.crate4 = "";
        didEndInside($("#menuOneSectionTwo"), function() {
            $(cloneOf).fadeOut(400, function() {
                $(cloneOf).remove();
            });
            $("#coinAmount").fadeOut(400);
            localStorage.coinCount = Number(localStorage.coinCount) + amount;
            $("#coinVal").html(localStorage.coinCount);
        });
        $("#crateOneSection").off();
        $("#crateTwoSection").off();
        $("#crateThreeSection").off();
        $("#crateFourSection").off();
        hasAddedC1Checker = false;
        hasAddedC2Checker = false;
        hasAddedC3Checker = false;
        hasAddedC4Checker = false;

        hasAddedC1RushChecker = false;
        hasAddedC2RushChecker = false;
        hasAddedC3RushChecker = false;
        hasAddedC4RushChecker = false;
    });
}

function openCrateFour(crateType) {
    $("#crateFourSection").css("z-index", 40);
    var cloneOf = $("#c4FinishedIMG").clone().appendTo("#menuOneSectionTwo").css({height: "14.23%", left: "76%", top: "51.4%"});
    $("#c4FinishedIMG").hide();
    if (crateType == "bronze") {
        var amount = 5000;
    } else if (crateType == "silver") {
        var amount = 10000;
    } else if (crateType == "gold") {
        var amount = 15000;
    } else if (crateType == "space") {
        var amount = 25000;
    }
    $(cloneOf).animate({height: "50%", left: "50%", top: "50%"}, 400, function() {
        $(cloneOf).attr("src", "img/"+crateType+"CrateOpen.png");
        $("#coinAmount").attr("src", "img/"+amount+"coin.png");
        $("#coinAmount").fadeIn(200);
        localStorage.crate4 = "";
        didEndInside($("#menuOneSectionTwo"), function() {
            $(cloneOf).fadeOut(400, function() {
                $(cloneOf).remove();
            });
            $("#coinAmount").fadeOut(400);
            localStorage.coinCount = Number(localStorage.coinCount) + amount;
            $("#coinVal").html(localStorage.coinCount);
        });
        $("#crateOneSection").off();
        $("#crateTwoSection").off();
        $("#crateThreeSection").off();
        $("#crateFourSection").off();
        hasAddedC1Checker = false;
        hasAddedC2Checker = false;
        hasAddedC3Checker = false;
        hasAddedC4Checker = false;

        hasAddedC1RushChecker = false;
        hasAddedC2RushChecker = false;
        hasAddedC3RushChecker = false;
        hasAddedC4RushChecker = false;
    });
}

function rushOpenCrateOne(twoType, twoOpenDateTime) {
    didEndInside($("#crateOneSection"), function() {
        var d1 = new Date();
        var timeDiff = twoOpenDateTime - d1.getTime();
        var starsToOpen = Math.round(timeDiff/1200000) + 1;
        var plural = "";
        if (starsToOpen !== 1) {
            plural = "s";
        }

        if ($("#c1Active").css('display') != 'none' && $("#crateOneSection").css('display') != 'none') {
            if (Number(localStorage.starCount) >= starsToOpen) {
                $("#openCost").text("Cost: " + starsToOpen + " Star" + plural);
                $("#openConfirmScreen").fadeIn(300);
                didEndInside($("#openSelector"), function() {
                    localStorage.starCount = Number(localStorage.starCount) - starsToOpen;
                    localStorage.crate1 = "finished " + twoType + " " + twoOpenDateTime;
                    $("#starVal").html(localStorage.starCount);
                    $("#openConfirmScreen").fadeOut(300);
                });
                didEndInside($("#stopSelector"), function() {
                    $("#openConfirmScreen").fadeOut(300);
                    rushOpenCrateOne(twoType, twoOpenDateTime);
                });
            } else {
                $("#cantAfford").fadeIn(300, function() {
                    didEndInside($("#cantAfford"), function() {
                        $("#cantAfford").fadeOut(300);
                        rushOpenCrateOne(twoType, twoOpenDateTime);
                    });
                });
            }
        }
    });
}

function rushOpenCrate(twoType, twoOpenDateTime) {
    didEndInside($("#crateTwoSection"), function() {
        var d1 = new Date();
        var timeDiff = twoOpenDateTime - d1.getTime();
        var starsToOpen = Math.round(timeDiff/1200000) + 1;
        var plural = "";
        if (starsToOpen !== 1) {
            plural = "s";
        }

        if ($("#c2Active").css('display') != 'none' && $("#crateTwoSection").css('display') != 'none') {
            if (Number(localStorage.starCount) >= starsToOpen) {
                $("#openCost").text("Cost: " + starsToOpen + " Star" + plural);
                $("#openConfirmScreen").fadeIn(300);
                didEndInside($("#openSelector"), function() {
                    localStorage.starCount = Number(localStorage.starCount) - starsToOpen;
                    localStorage.crate2 = "finished " + twoType + " " + twoOpenDateTime;
                    $("#starVal").html(localStorage.starCount);
                    $("#openConfirmScreen").fadeOut(300);
                });
                didEndInside($("#stopSelector"), function() {
                    $("#openConfirmScreen").fadeOut(300);
                    rushOpenCrate(twoType, twoOpenDateTime);
                });
            } else {
                $("#cantAfford").fadeIn(300, function() {
                    didEndInside($("#cantAfford"), function() {
                        $("#cantAfford").fadeOut(300);
                        rushOpenCrate(twoType, twoOpenDateTime);
                    });
                });
            }
        }
    });
}

function rushOpenCrate3(twoType, twoOpenDateTime) {
    didEndInside($("#crateThreeSection"), function() {
        var d1 = new Date();
        var timeDiff = twoOpenDateTime - d1.getTime();
        var starsToOpen = Math.round(timeDiff/1200000) + 1;
        var plural = "";
        if (starsToOpen !== 1) {
            plural = "s";
        }

        if ($("#c3Active").css('display') != 'none' && $("#crateThreeSection").css('display') != 'none') {
            if (Number(localStorage.starCount) >= starsToOpen) {
                $("#openCost").text("Cost: " + starsToOpen + " Star" + plural);
                $("#openConfirmScreen").fadeIn(300);
                didEndInside($("#openSelector"), function() {
                    localStorage.starCount = Number(localStorage.starCount) - starsToOpen;
                    localStorage.crate3 = "finished " + twoType + " " + twoOpenDateTime;
                    $("#starVal").html(localStorage.starCount);
                    $("#openConfirmScreen").fadeOut(300);
                });
                didEndInside($("#stopSelector"), function() {
                    $("#openConfirmScreen").fadeOut(300);
                    rushOpenCrate3(twoType, twoOpenDateTime);
                });
            } else {
                $("#cantAfford").fadeIn(300, function() {
                    didEndInside($("#cantAfford"), function() {
                        $("#cantAfford").fadeOut(300);
                        rushOpenCrate3(twoType, twoOpenDateTime);
                    });
                });
            }
        }
    });
}

function rushOpenCrate4(twoType, twoOpenDateTime) {
    didEndInside($("#crateFourSection"), function() {
        var d1 = new Date();
        var timeDiff = twoOpenDateTime - d1.getTime();
        var starsToOpen = Math.round(timeDiff/1200000) + 1;
        var plural = "";
        if (starsToOpen !== 1) {
            plural = "s";
        }

        if ($("#c4Active").css('display') != 'none' && $("#crateFourSection").css('display') != 'none') {
            if (Number(localStorage.starCount) >= starsToOpen) {
                $("#openCost").text("Cost: " + starsToOpen + " Star" + plural);
                $("#openConfirmScreen").fadeIn(300);
                didEndInside($("#openSelector"), function() {
                    localStorage.starCount = Number(localStorage.starCount) - starsToOpen;
                    localStorage.crate4 = "finished " + twoType + " " + twoOpenDateTime;
                    $("#starVal").html(localStorage.starCount);
                    $("#openConfirmScreen").fadeOut(300);
                });
                didEndInside($("#stopSelector"), function() {
                    $("#openConfirmScreen").fadeOut(300);
                    rushOpenCrate4(twoType, twoOpenDateTime);
                });
            } else {
                $("#cantAfford").fadeIn(300, function() {
                    didEndInside($("#cantAfford"), function() {
                        $("#cantAfford").fadeOut(300);
                        rushOpenCrate4(twoType, twoOpenDateTime);
                    });
                });
            }
        }
    });
}

var hasAddedC1Checker = false;
var hasAddedC2Checker = false;
var hasAddedC3Checker = false;
var hasAddedC4Checker = false;

var hasAddedC1RushChecker = false;
var hasAddedC2RushChecker = false;
var hasAddedC3RushChecker = false;
var hasAddedC4RushChecker = false;
function setUpCrates() {
    var nowDate = new Date();

    if (!(localStorage.crate1 && !(localStorage.crate1 === ""))) {
        localStorage.crate1 = "";
        localStorage.crate2 = "";
        localStorage.crate3 = "";
        localStorage.crate4 = "";
        $("#c1plus").show();
        $("#c1Closed").hide();
        $("#c1Finished").hide();
        $("#c1Active").hide();
        $("#crateThreeSection").hide();
        $("#crateFourSection").hide();
        $("#crateOneSection").show();
        $("#crateTwoSection").hide();

        $("#crateOneSection").off();
        didEndInside($("#crateOneSection"), function() {
            $("#shadeTransition").fadeIn(300, function() {
                loadStore(loadMenu);
            });
        });
    }
    else if (!(localStorage.crate2 && !(String(localStorage.crate2) === ""))) {
        localStorage.crate2 = "";
        localStorage.crate3 = "";
        localStorage.crate4 = "";
        $("#c1plus").hide();
        $("#c1Closed").hide();
        $("#c1Finished").hide();
        $("#c1Active").hide();
        $("#c2plus").show();
        $("#c2Active").hide();
        $("#c2Closed").hide();
        $("#c2Finished").hide();
        $("#crateThreeSection").hide();
        $("#crateFourSection").hide();
        $("#crateOneSection").show();
        $("#crateTwoSection").show();

        $("#crateTwoSection").off();
        didEndInside($("#crateTwoSection"), function() {
            $("#shadeTransition").fadeIn(300, function() {
                loadStore(loadMenu);
            });
        });

        var infoOneArray = localStorage.crate1.split(" ");
        var openedOne = infoOneArray[0];
        var oneType = infoOneArray[1];
        var oneOpenDateTime = Number(infoOneArray[2]);

        if (openedOne == "closed") {
            $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1Closed").show();

            if (localStorage.crate2.split(" ")[0] == "active") {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Closed").show();
                $("#c1startText").hide();
                $("#crateOneSection").off();
            } else {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1startText").show();
                $("#c1Closed").show();
                didEndInside($("#crateOneSection"), function() {
                    if (oneType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (oneType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (oneType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (oneType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate1 = "active " + oneType + " " + newOpenTime;
                });
            }
        } else if (openedOne == "active") {
            var timeDiff = oneOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c1Active").hide();
                $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Finished").show();

                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                });
                hasAddedC1Checker = true;
                localStorage.crate1 = "finished " + oneType + " " + oneOpenDateTime;
            } else {
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + (Math.round(timeDiff/1200000) + 1) + " Stars!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                if (!hasAddedC1RushChecker) {
                    rushOpenCrateOne(oneType, oneOpenDateTime);
                    hasAddedC1RushChecker = true;
                }
            }
        } else {
            $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1FinishedIMG").show();
            $("#c1Finished").show();
            if (!hasAddedC1Checker) {
                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC1Checker = true;
            }
        }
    }
    else if (!(localStorage.crate3 && !(localStorage.crate3 === ""))) {
        localStorage.crate3 = "";
        localStorage.crate4 = "";
        $("#c1plus").hide();
        $("#c1Closed").hide();
        $("#c1Finished").hide();
        $("#c1Active").hide();
        $("#c2plus").hide();
        $("#c2Active").hide();
        $("#c2Closed").hide();
        $("#c2Finished").hide();
        $("#c3plus").show();
        $("#c3Active").hide();
        $("#c3Closed").hide();
        $("#c3Finished").hide();
        $("#crateThreeSection").show();
        $("#crateFourSection").hide();
        $("#crateOneSection").show();
        $("#crateTwoSection").show();

        $("#crateThreeSection").off();
        didEndInside($("#crateThreeSection"), function() {
            $("#shadeTransition").fadeIn(300, function() {
                loadStore(loadMenu);
            });
        });

        var infoOneArray = localStorage.crate1.split(" ");
        var openedOne = infoOneArray[0];
        var oneType = infoOneArray[1];
        var oneOpenDateTime = Number(infoOneArray[2]);

        if (openedOne == "closed") {
            $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1Closed").show();

            if (localStorage.crate2.split(" ")[0] == "active") {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Closed").show();
                $("#c1startText").hide();
                $("#crateOneSection").off();
            } else {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1startText").show();
                $("#c1Closed").show();
                didEndInside($("#crateOneSection"), function() {
                    if (oneType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (oneType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (oneType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (oneType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate1 = "active " + oneType + " " + newOpenTime;
                });
            }
        } else if (openedOne == "active") {
            var timeDiff = oneOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c1Active").hide();
                $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Finished").show();

                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                });
                hasAddedC1Checker = true;
                localStorage.crate1 = "finished " + oneType + " " + oneOpenDateTime;
            } else {
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + (Math.round(timeDiff/1200000) + 1) + " Stars!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                if (!hasAddedC1RushChecker) {
                    rushOpenCrateOne(oneType, oneOpenDateTime);
                    hasAddedC1RushChecker = true;
                }
            }
        } else {
            $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1FinishedIMG").show();
            $("#c1Finished").show();
            if (!hasAddedC1Checker) {
                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC1Checker = true;
            }
        }

        var infoTwoArray = localStorage.crate2.split(" ");
        var openedTwo = infoTwoArray[0];
        var twoType = infoTwoArray[1];
        var twoOpenDateTime = Number(infoTwoArray[2]);

        if (openedTwo == "closed") {
            if (localStorage.crate1.split(" ")[0] == "active") {
                $("#c2ClosedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2startText").hide();
                $("#c2Closed").show();
                $("#crateTwoSection").off();
            } else {
                $("#c2ClosedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2startText").show();
                $("#c2Closed").show();
                didEndInside($("#crateTwoSection"), function() {
                    if (twoType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (twoType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (twoType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (twoType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate2 = "active " + twoType + " " + newOpenTime;
                });
            }
        } else if (openedTwo == "active") {
            var timeDiff = twoOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c2Active").hide();
                $("#c2FinishedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2Finished").show();

                didEndInside($("#crateTwoSection"), function() {
                    openCrateTwo(twoType);
                });
                hasAddedC2Checker = true;
                localStorage.crate2 = "finished " + twoType + " " + twoOpenDateTime;
            } else {
                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c2timeText").text(getTimeString(timeDiff));
                $("#c2openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c2ActiveIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2Active").show();

                if (!hasAddedC2RushChecker) {
                    rushOpenCrate(twoType, twoOpenDateTime);
                    hasAddedC2RushChecker = true;
                }
            }
        } else {
            $("#c2FinishedIMG").attr("src", "img/" + twoType + "Crate.png");
            $("#c2FinishedIMG").show();
            $("#c2Finished").show();
            if (!hasAddedC2Checker) {
                didEndInside($("#crateTwoSection"), function() {
                    openCrateTwo(twoType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC2Checker = true;
            }
        }
    } else if (!(localStorage.crate4 && !(localStorage.crate4 === ""))) {
        localStorage.crate4 = "";
        $("#c1plus").hide();
        $("#c1Closed").hide();
        $("#c1Finished").hide();
        $("#c1Active").hide();
        $("#c2plus").hide();
        $("#c2Active").hide();
        $("#c2Closed").hide();
        $("#c2Finished").hide();
        $("#c3plus").hide();
        $("#c3Active").hide();
        $("#c3Closed").hide();
        $("#c3Finished").hide();
        $("#c4plus").show();
        $("#c4Active").hide();
        $("#c4Closed").hide();
        $("#c4Finished").hide();
        $("#crateThreeSection").show();
        $("#crateFourSection").show();
        $("#crateOneSection").show();
        $("#crateTwoSection").show();

        $("#crateFourSection").off();
        didEndInside($("#crateFourSection"), function() {
            $("#shadeTransition").fadeIn(300, function() {
                loadStore(loadMenu);
            });
        });

        var infoOneArray = localStorage.crate1.split(" ");
        var openedOne = infoOneArray[0];
        var oneType = infoOneArray[1];
        var oneOpenDateTime = Number(infoOneArray[2]);

        if (openedOne == "closed") {
            $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1Closed").show();

            if (localStorage.crate2.split(" ")[0] == "active" || localStorage.crate3.split(" ")[0] == "active") {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Closed").show();
                $("#c1startText").hide();
                $("#crateOneSection").off();
            } else {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1startText").show();
                $("#c1Closed").show();
                didEndInside($("#crateOneSection"), function() {
                    if (oneType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (oneType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (oneType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (oneType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate1 = "active " + oneType + " " + newOpenTime;
                });
            }
        } else if (openedOne == "active") {
            var timeDiff = oneOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c1Active").hide();
                $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Finished").show();

                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                });
                hasAddedC1Checker = true;
                localStorage.crate1 = "finished " + oneType + " " + oneOpenDateTime;
            } else {
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + (Math.round(timeDiff/1200000) + 1) + " Stars!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                if (!hasAddedC1RushChecker) {
                    rushOpenCrateOne(oneType, oneOpenDateTime);
                    hasAddedC1RushChecker = true;
                }
            }
        } else {
            $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1FinishedIMG").show();
            $("#c1Finished").show();
            if (!hasAddedC1Checker) {
                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC1Checker = true;
            }
        }

        var infoTwoArray = localStorage.crate2.split(" ");
        var openedTwo = infoTwoArray[0];
        var twoType = infoTwoArray[1];
        var twoOpenDateTime = Number(infoTwoArray[2]);

        if (openedTwo == "closed") {
            if (localStorage.crate1.split(" ")[0] == "active" || localStorage.crate3.split(" ")[0] == "active") {
                $("#c2ClosedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2startText").hide();
                $("#c2Closed").show();
                $("#crateTwoSection").off();
            } else {
                $("#c2ClosedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2startText").show();
                $("#c2Closed").show();
                didEndInside($("#crateTwoSection"), function() {
                    if (twoType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (twoType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (twoType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (twoType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate2 = "active " + twoType + " " + newOpenTime;
                });
            }
        } else if (openedTwo == "active") {
            var timeDiff = twoOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c2Active").hide();
                $("#c2FinishedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2Finished").show();

                didEndInside($("#crateTwoSection"), function() {
                    openCrateTwo(twoType);
                });
                hasAddedC2Checker = true;
                localStorage.crate2 = "finished " + twoType + " " + twoOpenDateTime;
            } else {
                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c2timeText").text(getTimeString(timeDiff));
                $("#c2openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c2ActiveIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2Active").show();

                if (!hasAddedC2RushChecker) {
                    rushOpenCrate(twoType, twoOpenDateTime);
                    hasAddedC2RushChecker = true;
                }
            }
        } else {
            $("#c2FinishedIMG").attr("src", "img/" + twoType + "Crate.png");
            $("#c2FinishedIMG").show();
            $("#c2Finished").show();
            if (!hasAddedC2Checker) {
                didEndInside($("#crateTwoSection"), function() {
                    openCrateTwo(twoType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC2Checker = true;
            }
        }

        var infoThreeArray = localStorage.crate3.split(" ");
        var openedThree = infoThreeArray[0];
        var threeType = infoThreeArray[1];
        var threeOpenDateTime = Number(infoThreeArray[2]);

        if (openedThree == "closed") {
            if (localStorage.crate1.split(" ")[0] == "active" || localStorage.crate2.split(" ")[0] == "active") {
                $("#c3ClosedIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3startText").hide();
                $("#c3Closed").show();
                $("#crateThreeSection").off();
            } else {
                $("#c3ClosedIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3startText").show();
                $("#c3Closed").show();
                didEndInside($("#crateThreeSection"), function() {
                    if (threeType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (threeType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (threeType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (threeType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate3 = "active " + threeType + " " + newOpenTime;
                });
            }
        } else if (openedThree == "active") {
            var timeDiff = threeOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c3Active").hide();
                $("#c3FinishedIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3Finished").show();

                didEndInside($("#crateThreeSection"), function() {
                    openCrateThree(threeType);
                });
                hasAddedC3Checker = true;
                localStorage.crate3 = "finished " + threeType + " " + threeOpenDateTime;
            } else {
                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c3timeText").text(getTimeString(timeDiff));
                $("#c3openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c3ActiveIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3Active").show();

                if (!hasAddedC3RushChecker) {
                    rushOpenCrate3(threeType, threeOpenDateTime);
                    hasAddedC3RushChecker = true;
                }
            }
        } else {
            $("#c3FinishedIMG").attr("src", "img/" + threeType + "Crate.png");
            $("#c3FinishedIMG").show();
            $("#c3Finished").show();
            if (!hasAddedC3Checker) {
                didEndInside($("#crateThreeSection"), function() {
                    openCrateThree(threeType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC3Checker = true;
            }
        }
    } else {
        $("#c1plus").hide();
        $("#c1Closed").hide();
        $("#c1Finished").hide();
        $("#c1Active").hide();
        $("#c2plus").hide();
        $("#c2Active").hide();
        $("#c2Closed").hide();
        $("#c2Finished").hide();
        $("#c3plus").hide();
        $("#c3Active").hide();
        $("#c3Closed").hide();
        $("#c3Finished").hide();
        $("#c4plus").hide();
        $("#c4Active").hide();
        $("#c4Closed").hide();
        $("#c4Finished").hide();
        $("#crateThreeSection").show();
        $("#crateFourSection").show();
        $("#crateOneSection").show();
        $("#crateTwoSection").show();

        var infoOneArray = localStorage.crate1.split(" ");
        var openedOne = infoOneArray[0];
        var oneType = infoOneArray[1];
        var oneOpenDateTime = Number(infoOneArray[2]);

        if (openedOne == "closed") {
            $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1Closed").show();

            if (localStorage.crate2.split(" ")[0] == "active" || localStorage.crate3.split(" ")[0] == "active" || localStorage.crate4.split(" ")[0] == "active") {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Closed").show();
                $("#c1startText").hide();
                $("#crateOneSection").off();
            } else {
                $("#c1ClosedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1startText").show();
                $("#c1Closed").show();
                didEndInside($("#crateOneSection"), function() {
                    if (oneType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (oneType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (oneType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (oneType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate1 = "active " + oneType + " " + newOpenTime;
                });
            }
        } else if (openedOne == "active") {
            var timeDiff = oneOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c1Active").hide();
                $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Finished").show();

                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                });
                hasAddedC1Checker = true;
                localStorage.crate1 = "finished " + oneType + " " + oneOpenDateTime;
            } else {
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + (Math.round(timeDiff/1200000) + 1) + " Stars!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c1timeText").text(getTimeString(timeDiff));
                $("#c1openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c1ActiveIMG").attr("src", "img/" + oneType + "Crate.png");
                $("#c1Active").show();

                if (!hasAddedC1RushChecker) {
                    rushOpenCrateOne(oneType, oneOpenDateTime);
                    hasAddedC1RushChecker = true;
                }
            }
        } else {
            $("#c1FinishedIMG").attr("src", "img/" + oneType + "Crate.png");
            $("#c1FinishedIMG").show();
            $("#c1Finished").show();
            if (!hasAddedC1Checker) {
                didEndInside($("#crateOneSection"), function() {
                    openCrateOne(oneType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC1Checker = true;
            }
        }

        var infoTwoArray = localStorage.crate2.split(" ");
        var openedTwo = infoTwoArray[0];
        var twoType = infoTwoArray[1];
        var twoOpenDateTime = Number(infoTwoArray[2]);

        if (openedTwo == "closed") {
            if (localStorage.crate1.split(" ")[0] == "active" || localStorage.crate3.split(" ")[0] == "active" || localStorage.crate4.split(" ")[0] == "active") {
                $("#c2ClosedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2startText").hide();
                $("#c2Closed").show();
                $("#crateTwoSection").off();
            } else {
                $("#c2ClosedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2startText").show();
                $("#c2Closed").show();
                didEndInside($("#crateTwoSection"), function() {
                    if (twoType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (twoType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (twoType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (twoType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate2 = "active " + twoType + " " + newOpenTime;
                });
            }
        } else if (openedTwo == "active") {
            var timeDiff = twoOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c2Active").hide();
                $("#c2FinishedIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2Finished").show();

                didEndInside($("#crateTwoSection"), function() {
                    openCrateTwo(twoType);
                });
                hasAddedC2Checker = true;
                localStorage.crate2 = "finished " + twoType + " " + twoOpenDateTime;
            } else {
                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c2timeText").text(getTimeString(timeDiff));
                $("#c2openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c2ActiveIMG").attr("src", "img/" + twoType + "Crate.png");
                $("#c2Active").show();

                if (!hasAddedC2RushChecker) {
                    rushOpenCrate(twoType, twoOpenDateTime);
                    hasAddedC2RushChecker = true;
                }
            }
        } else {
            $("#c2FinishedIMG").attr("src", "img/" + twoType + "Crate.png");
            $("#c2FinishedIMG").show();
            $("#c2Finished").show();
            if (!hasAddedC2Checker) {
                didEndInside($("#crateTwoSection"), function() {
                    openCrateTwo(twoType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC2Checker = true;
            }
        }

        var infoThreeArray = localStorage.crate3.split(" ");
        var openedThree = infoThreeArray[0];
        var threeType = infoThreeArray[1];
        var threeOpenDateTime = Number(infoThreeArray[2]);

        if (openedThree == "closed") {
            if (localStorage.crate1.split(" ")[0] == "active" || localStorage.crate2.split(" ")[0] == "active" || localStorage.crate4.split(" ")[0] == "active") {
                $("#c3ClosedIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3startText").hide();
                $("#c3Closed").show();
                $("#crateThreeSection").off();
            } else {
                $("#c3ClosedIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3startText").show();
                $("#c3Closed").show();
                didEndInside($("#crateThreeSection"), function() {
                    if (threeType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (threeType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (threeType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (threeType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate3 = "active " + threeType + " " + newOpenTime;
                });
            }
        } else if (openedThree == "active") {
            var timeDiff = threeOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c3Active").hide();
                $("#c3FinishedIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3Finished").show();

                didEndInside($("#crateThreeSection"), function() {
                    openCrateThree(threeType);
                });
                hasAddedC3Checker = true;
                localStorage.crate3 = "finished " + threeType + " " + threeOpenDateTime;
            } else {
                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c3timeText").text(getTimeString(timeDiff));
                $("#c3openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c3ActiveIMG").attr("src", "img/" + threeType + "Crate.png");
                $("#c3Active").show();

                if (!hasAddedC3RushChecker) {
                    rushOpenCrate3(threeType, threeOpenDateTime);
                    hasAddedC3RushChecker = true;
                }
            }
        } else {
            $("#c3FinishedIMG").attr("src", "img/" + threeType + "Crate.png");
            $("#c3FinishedIMG").show();
            $("#c3Finished").show();
            if (!hasAddedC3Checker) {
                didEndInside($("#crateThreeSection"), function() {
                    openCrateThree(threeType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC3Checker = true;
            }
        }

        var infoFourArray = localStorage.crate4.split(" ");
        var openedFour = infoFourArray[0];
        var fourType = infoFourArray[1];
        var fourOpenDateTime = Number(infoFourArray[2]);

        if (openedFour == "closed") {
            if (localStorage.crate1.split(" ")[0] == "active" || localStorage.crate2.split(" ")[0] == "active" || localStorage.crate3.split(" ")[0] == "active") {
                $("#c4ClosedIMG").attr("src", "img/" + fourType + "Crate.png");
                $("#c4startText").hide();
                $("#c4Closed").show();
                $("#crateFourSection").off();
            } else {
                $("#c4ClosedIMG").attr("src", "img/" + fourType + "Crate.png");
                $("#c4startText").show();
                $("#c4Closed").show();
                didEndInside($("#crateFourSection"), function() {
                    if (fourType == "bronze") {
                        var newOpenTime = nowDate.getTime() + 7200000;
                    } else if (fourType == "silver") {
                        var newOpenTime = nowDate.getTime() + 18000000;
                    } else if (fourType == "gold") {
                        var newOpenTime = nowDate.getTime() + 28800000;
                    } else if (fourType == "space") {
                        var newOpenTime = nowDate.getTime() + 43200000;
                    }
                    localStorage.crate4 = "active " + fourType + " " + newOpenTime;
                });
            }
        } else if (openedFour == "active") {
            var timeDiff = fourOpenDateTime - nowDate.getTime();
            if (timeDiff <= 1) {
                $("#c4Active").hide();
                $("#c4FinishedIMG").attr("src", "img/" + fourType + "Crate.png");
                $("#c4Finished").show();

                didEndInside($("#crateFourSection"), function() {
                    openCrateFour(fourType);
                });
                hasAddedC4Checker = true;
                localStorage.crate4 = "finished " + fourType + " " + fourOpenDateTime;
            } else {
                var starsToOpen = Math.round(timeDiff/1200000) + 1;
                var plural = "";
                if (starsToOpen != 1) {
                    plural = "s";
                }
                $("#c4timeText").text(getTimeString(timeDiff));
                $("#c4openText").text("Open Now For " + starsToOpen + " Star" + plural + "!");
            
                $("#c4ActiveIMG").attr("src", "img/" + fourType + "Crate.png");
                $("#c4Active").show();

                if (!hasAddedC4RushChecker) {
                    rushOpenCrate4(fourType, fourOpenDateTime);
                    hasAddedC4RushChecker = true;
                }
            }
        } else {
            $("#c4FinishedIMG").attr("src", "img/" + fourType + "Crate.png");
            $("#c4FinishedIMG").show();
            $("#c4Finished").show();
            if (!hasAddedC4Checker) {
                didEndInside($("#crateFourSection"), function() {
                    openCrateFour(fourType);
                    // hasAddedC1Checker = false;
                });
                hasAddedC4Checker = true;
            }
        }
    }
    setTimeout(setUpCrates, 1000);
}

function loadMenu(pageNumber) {
    unBindHandlers();
    $('canvas').remove();
    $("#hillLevel").html("");
    $("#mainScreen1").html(menuHTML);
    $("#mainScreen2").html("");
    $("#storeScreen").html("");

   // $("#mainScreen1").html('<img src = "img/menuOneBG.png" style = "position: fixed; width: 100%; height: 100%;"><img src = "img/b3.png" style = "position: fixed; height: 8%; left: 3.5%; z-index: 2; top: 5.3%"><p class = "lootVal" id = "starVal">75</p><p class = "lootVal" id = "coinVal">4,359</p><img src = "img/storeIcon.png" style = "position: fixed; right: 3%; top: 3%; height: 9%; cursor: pointer;" class = "btnHover"><img src = "img/hillLevelPromo.png" style = "position: fixed; height: 55%; left: 8%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover" id = "hillLevelPromo"><img src = "img/TBDPromo.png" style = "position: fixed; height: 55%; left: 34%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover"><img src = "img/TBDPromo.png" style = "position: fixed; height: 55%; left: 60%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover"><img src = "img/TBDPromo.png" style = "position: fixed; height: 55%; left: 86%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover"><img src = "img/rateUsBtn.png" style = "position: fixed; height: 14%; right: 4%; bottom: 4%; z-index: 2; cursor: pointer;" class = "btnHover">');
    $("#coinVal").html(localStorage.coinCount);
    $("#starVal").html(localStorage.starCount);
    refreshHover();
    $("#shadeTransition").fadeOut(300);

    $("#crateOneSection").off();
    $("#crateTwoSection").off();
    hasAddedC1Checker = false;
    hasAddedC2Checker = false;
    hasAddedC3Checker = false;

    hasAddedC1RushChecker = false;
    hasAddedC2RushChecker = false;
    hasAddedC3RushChecker = false;

    setUpCrates();

    if (pageNumber === 2) {
        $("#menuOneSectionOne").css({marginLeft: "-100%"});
        $("#menuOneSectionTwo").css({marginLeft: "0%"});
    }

    didEndInside($("#hillLevelPromo"), function() {
        $("#shadeTransition").fadeIn(300, function() {
            loadMenu2();
        });
    });

    didEndInsidePerm($("#menuNextPage"), function() {
        $("#menuOneSectionOne").animate({marginLeft: "-100%"}, 300);
        $("#menuOneSectionTwo").animate({marginLeft: "0%"}, 300);

    });
    didEndInsidePerm($("#menuNextPage2"), function() {
        $("#menuOneSectionOne").animate({marginLeft: "0%"}, 300);
        $("#menuOneSectionTwo").animate({marginLeft: "100%"}, 300);
        
    });

    didEndInside($("#storeICN"), function() {
        $("#shadeTransition").fadeIn(300, function() {
            loadStore(loadMenu);
        });
    });
}

function loadStore(backPath) {
    unBindHandlers();
    $('canvas').remove();
    $("#hillLevel").html("");
    $("#mainScreen1").html("");
    $("#mainScreen2").html("");
    $("#storeScreen").html(storeHTML);
    $("#coinVal").html(localStorage.coinCount);
    $("#starVal").html(localStorage.starCount);
    refreshHover();
    $("#shadeTransition").fadeOut(300);

    didEndInside($("#backArrow3"), function() {
        $("#shadeTransition").fadeIn(300, function() {
            backPath.call();
        });
    });

    didEndInsidePerm($("#crate1PurchaseBTN"), function() {
        if (Number(localStorage.starCount) >= 5) {
            $("#purchaseConfirmScreen").fadeIn(300, function() {
                $("#openCost").html("Bronze Crate For 5 Stars");
                $("#openSelector").attr("typeOf", "crate1");
            });
        } else {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#crate2PurchaseBTN"), function() {
        if (Number(localStorage.starCount) >= 7) {
            $("#purchaseConfirmScreen").fadeIn(300, function() {
                $("#openCost").html("Silver Crate For 7 Stars");
                $("#openSelector").attr("typeOf", "crate2");
            });
        } else {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#crate3PurchaseBTN"), function() {
        if (Number(localStorage.starCount) >= 10) {
            $("#purchaseConfirmScreen").fadeIn(300, function() {
                $("#openCost").html("Gold Crate For 10 Stars");
                $("#openSelector").attr("typeOf", "crate3");
            });
        } else {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#crate4PurchaseBTN"), function() {
        if (Number(localStorage.starCount) >= 20) {
            $("#purchaseConfirmScreen").fadeIn(300, function() {
                $("#openCost").html("Cosmic Crate For 20 Stars");
                $("#openSelector").attr("typeOf", "crate4");
            });
        } else {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#coin1PurchaseBTN"), function() {
        localStorage.coinCount = Number(localStorage.coinCount) + 60000;
        $("#coinVal").html(localStorage.coinCount);
    });

    didEndInsidePerm($("#star1PurchaseBTN"), function() {
        localStorage.starCount = Number(localStorage.starCount) + 100;
        $("#starVal").html(localStorage.starCount);
    });

    didEndInsidePerm($("#openSelector"), function() {
        if ($("#openSelector").attr("typeOf") == "crate1" && Number(localStorage.starCount) >= 5) {
            localStorage.starCount = Number(localStorage.starCount) - 5;

            if ((!localStorage.crate1) || localStorage.crate1 == "") {
                localStorage.crate1 = "closed bronze 9";
            } else if ((!localStorage.crate2) || localStorage.crate2 == "") {
                localStorage.crate2 = "closed bronze 9";
            } else if ((!localStorage.crate3) || localStorage.crate3 == "") {
                localStorage.crate3 = "closed bronze 9";
            } else if ((!localStorage.crate4) || localStorage.crate4 == "") {
                localStorage.crate4 = "closed bronze 9";
            }

            $("#starVal").html(localStorage.starCount);
            $("#shadeTransition").fadeIn(300, function() {
                loadMenu(2);
            });
        } else if ($("#openSelector").attr("typeOf") == "crate2" && Number(localStorage.starCount) >= 7) {
            localStorage.starCount = Number(localStorage.starCount) - 7;
            
            if ((!localStorage.crate1) || localStorage.crate1 == "") {
                localStorage.crate1 = "closed silver 9";
            } else if ((!localStorage.crate2) || localStorage.crate2 == "") {
                localStorage.crate2 = "closed silver 9";
            } else if ((!localStorage.crate3) || localStorage.crate3 == "") {
                localStorage.crate3 = "closed silver 9";
            } else if ((!localStorage.crate4) || localStorage.crate4 == "") {
                localStorage.crate4 = "closed silver 9";
            }

            $("#starVal").html(localStorage.starCount);
            $("#shadeTransition").fadeIn(300, function() {
                loadMenu(2);
            });
        } else if ($("#openSelector").attr("typeOf") == "crate3" && Number(localStorage.starCount) >= 10) {
            localStorage.starCount = Number(localStorage.starCount) - 10;

            if ((!localStorage.crate1) || localStorage.crate1 == "") {
                localStorage.crate1 = "closed gold 9";
            } else if ((!localStorage.crate2) || localStorage.crate2 == "") {
                localStorage.crate2 = "closed gold 9";
            } else if ((!localStorage.crate3) || localStorage.crate3 == "") {
                localStorage.crate3 = "closed gold 9";
            } else if ((!localStorage.crate4) || localStorage.crate4 == "") {
                localStorage.crate4 = "closed gold 9";
            }

            $("#starVal").html(localStorage.starCount);
            $("#shadeTransition").fadeIn(300, function() {
                loadMenu(2);
            });
        } else if ($("#openSelector").attr("typeOf") == "crate4" && Number(localStorage.starCount) >= 20) {
            localStorage.starCount = Number(localStorage.starCount) - 20;

            if ((!localStorage.crate1) || localStorage.crate1 == "") {
                localStorage.crate1 = "closed space 9";
            } else if ((!localStorage.crate2) || localStorage.crate2 == "") {
                localStorage.crate2 = "closed space 9";
            } else if ((!localStorage.crate3) || localStorage.crate3 == "") {
                localStorage.crate3 = "closed space 9";
            } else if ((!localStorage.crate4) || localStorage.crate4 == "") {
                localStorage.crate4 = "closed space 9";
            }

            $("#starVal").html(localStorage.starCount);
            $("#shadeTransition").fadeIn(300, function() {
                loadMenu(2);
            });
        }
    });

    didEndInsidePerm($("#stopSelector"), function() {
        $("#purchaseConfirmScreen").fadeOut(300);
    });


}

upgradeCosts = {
    car1: {
        1: 1000,
        2: 4000,
        3: 6000,
        4: 9000,
        5: 12000,
        6: 15000,
        7: 18000,
        8: 21000,
        9: 25000,
        10: 29000,
        11: 33000,
        12: 37000,
        13: 41000,
        14: 46000,
        15: 51000,
        16: 56000,
        17: 62000,
        18: 68000,
        19: 74000,
        20: 80000,
        21: 87000,
        22: 95000,
        23: 110000,
        24: 125000,
        25: 150000,
    }
};

function loadMenu2() {
    unBindHandlers();
    $('canvas').remove();
    $("#hillLevel").html("");
    $("#mainScreen1").html("");
    $("#mainScreen2").html(menu2HTML);
    $("#storeScreen").html("");
   // $("#mainScreen1").html('<img src = "img/menuOneBG.png" style = "position: fixed; width: 100%; height: 100%;"><img src = "img/b3.png" style = "position: fixed; height: 8%; left: 3.5%; z-index: 2; top: 5.3%"><p class = "lootVal" id = "starVal">75</p><p class = "lootVal" id = "coinVal">4,359</p><img src = "img/storeIcon.png" style = "position: fixed; right: 3%; top: 3%; height: 9%; cursor: pointer;" class = "btnHover"><img src = "img/hillLevelPromo.png" style = "position: fixed; height: 55%; left: 8%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover" id = "hillLevelPromo"><img src = "img/TBDPromo.png" style = "position: fixed; height: 55%; left: 34%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover"><img src = "img/TBDPromo.png" style = "position: fixed; height: 55%; left: 60%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover"><img src = "img/TBDPromo.png" style = "position: fixed; height: 55%; left: 86%; bottom: 22%; z-index: 2; cursor: pointer;" class = "btnHover"><img src = "img/rateUsBtn.png" style = "position: fixed; height: 14%; right: 4%; bottom: 4%; z-index: 2; cursor: pointer;" class = "btnHover">');
    //$("#coinVal").html(localStorage.coinCount);
    refreshHover();
    $("#shadeTransition").fadeOut(300);
    $("#coinVal").html(localStorage.coinCount);
    $("#starVal").html(localStorage.starCount);

    if (localStorage.car1EngineLVL) {
        $("#engineLevel").html("LVL: " + localStorage.car1EngineLVL +"/25");
        $("#enginePrice").html("$" + upgradeCosts.car1[localStorage.car1EngineLVL]);
    } else {
        localStorage.car1EngineLVL = 1;
        $("#engineLevel").html("LVL: 1/25");
        $("#enginePrice").html("$" + upgradeCosts.car1[localStorage.car1EngineLVL]);
    }

    if (localStorage.car1BalanceLVL) {
        $("#balanceLevel").html("LVL: " + localStorage.car1BalanceLVL +"/25");
        $("#balancePrice").html("$" + upgradeCosts.car1[localStorage.car1BalanceLVL]);
    } else {
        localStorage.car1BalanceLVL = 1;
        $("#balanceLevel").html("LVL: 1/25");
        $("#balancePrice").html("$" + upgradeCosts.car1[localStorage.car1BalanceLVL]);
    }

    if (localStorage.car1TractionLVL) {
        $("#tractionLevel").html("LVL: " + localStorage.car1TractionLVL +"/25");
        $("#tractionPrice").html("$" + upgradeCosts.car1[localStorage.car1TractionLVL]);
    } else {
        localStorage.car1TractionLVL = 1;
        $("#tractionLevel").html("LVL: 1/25");
        $("#tractionPrice").html("$" + upgradeCosts.car1[localStorage.car1TractionLVL]);
    }

    if (localStorage.car1FuelLVL) {
        $("#fuelLevel").html("LVL: " + localStorage.car1FuelLVL +"/25");
        $("#fuelPrice").html("$" + upgradeCosts.car1[localStorage.car1FuelLVL]);
    } else {
        localStorage.car1FuelLVL = 1;
        $("#fuelLevel").html("LVL: 1/25");
        $("#fuelPrice").html("$" + upgradeCosts.car1[localStorage.car1FuelLVL]);
    }

    didEndInsidePerm($("#engineUpgrade"), function() {
        if (Number(localStorage.car1EngineLVL) < 25 && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1EngineLVL]) {
            $("#upgradeCost").html("Cost: $" + upgradeCosts.car1[localStorage.car1EngineLVL]);
            $("#purchaseSelector").attr("typeOf", "engine");
            $("#upgradeImage").attr("src", "img/upgradeEngine.png");
            $("#upgradeScreen").fadeIn(300);
        } else if (Number(localStorage.car1EngineLVL) < 25 && Number(localStorage.coinCount) < upgradeCosts.car1[localStorage.car1EngineLVL]) {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#balanceUpgrade"), function() {
        if (Number(localStorage.car1BalanceLVL) < 25 && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1BalanceLVL]) {
            $("#upgradeCost").html("Cost: $" + upgradeCosts.car1[localStorage.car1BalanceLVL]);
            $("#purchaseSelector").attr("typeOf", "balance");
            $("#upgradeImage").attr("src", "img/upgradeBalance.png");
            $("#upgradeScreen").fadeIn(300);
        } else if (Number(localStorage.car1BalanceLVL) < 25 && Number(localStorage.coinCount) < upgradeCosts.car1[localStorage.car1BalanceLVL]) {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#tractionUpgrade"), function() {
        if (Number(localStorage.car1TractionLVL) < 25 && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1TractionLVL]) {
            $("#upgradeCost").html("Cost: $" + upgradeCosts.car1[localStorage.car1TractionLVL]);
            $("#purchaseSelector").attr("typeOf", "traction");
            $("#upgradeImage").attr("src", "img/upgradeTraction.png");
            $("#upgradeScreen").fadeIn(300);
        } else if (Number(localStorage.car1TractionLVL) < 25 && Number(localStorage.coinCount) < upgradeCosts.car1[localStorage.car1TractionLVL]) {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#fuelUpgrade"), function() {
        if (Number(localStorage.car1FuelLVL) < 25 && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1FuelLVL]) {
            $("#upgradeCost").html("Cost: $" + upgradeCosts.car1[localStorage.car1FuelLVL]);
            $("#purchaseSelector").attr("typeOf", "fuel");
            $("#upgradeImage").attr("src", "img/upgradeFueltank.png");
            $("#upgradeScreen").fadeIn(300);
        } else if (Number(localStorage.car1FuelLVL) < 25 && Number(localStorage.coinCount) < upgradeCosts.car1[localStorage.car1FuelLVL]) {
            $("#cantAfford").fadeIn(300, function() {
                didEndInside($("#cantAfford"), function() {
                    $("#cantAfford").fadeOut(300);
                });
            });
        }
    });

    didEndInsidePerm($("#purchaseSelector"), function() {
        if ($("#purchaseSelector").attr("typeOf") == "engine" && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1EngineLVL]) {
            localStorage.coinCount = Number(localStorage.coinCount) - upgradeCosts.car1[localStorage.car1EngineLVL];
            localStorage.car1EngineLVL = Number(localStorage.car1EngineLVL) + 1;
            $("#coinVal").html(localStorage.coinCount);
            $("#engineLevel").html("LVL: " + localStorage.car1EngineLVL +"/25");
            $("#enginePrice").html("$" + upgradeCosts.car1[localStorage.car1EngineLVL]);
            $("#upgradeScreen").fadeOut(300);
        } else if ($("#purchaseSelector").attr("typeOf") == "balance" && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1BalanceLVL]) {
            localStorage.coinCount = Number(localStorage.coinCount) - upgradeCosts.car1[localStorage.car1BalanceLVL];
            localStorage.car1BalanceLVL = Number(localStorage.car1BalanceLVL) + 1;
            $("#coinVal").html(localStorage.coinCount);
            $("#balanceLevel").html("LVL: " + localStorage.car1BalanceLVL +"/25");
            $("#balancePrice").html("$" + upgradeCosts.car1[localStorage.car1BalanceLVL]);
            $("#upgradeScreen").fadeOut(300);
        } else if ($("#purchaseSelector").attr("typeOf") == "traction" && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1TractionLVL]) {
            localStorage.coinCount = Number(localStorage.coinCount) - upgradeCosts.car1[localStorage.car1TractionLVL];
            localStorage.car1TractionLVL = Number(localStorage.car1TractionLVL) + 1;
            $("#coinVal").html(localStorage.coinCount);
            $("#tractionLevel").html("LVL: " + localStorage.car1TractionLVL +"/25");
            $("#tractionPrice").html("$" + upgradeCosts.car1[localStorage.car1TractionLVL]);
            $("#upgradeScreen").fadeOut(300);
        } else if ($("#purchaseSelector").attr("typeOf") == "fuel" && Number(localStorage.coinCount) >= upgradeCosts.car1[localStorage.car1FuelLVL]) {
            localStorage.coinCount = Number(localStorage.coinCount) - upgradeCosts.car1[localStorage.car1FuelLVL];
            localStorage.car1FuelLVL = Number(localStorage.car1FuelLVL) + 1;
            $("#coinVal").html(localStorage.coinCount);
            $("#fuelLevel").html("LVL: " + localStorage.car1FuelLVL +"/25");
            $("#fuelPrice").html("$" + upgradeCosts.car1[localStorage.car1FuelLVL]);
            $("#upgradeScreen").fadeOut(300);
        }
    });

    didEndInsidePerm($("#cancelSelector"), function() {
        $("#upgradeScreen").fadeOut(300);
    });

    didEndInside($("#startLevel"), function() {
        $("#shadeTransition").fadeIn(300, function() {
            setUpHillLevel();
        });
    });

    didEndInside($("#backArrow"), function() {
        $("#shadeTransition").fadeIn(300, function() {
            loadMenu();
        });
    });

    didEndInside($("#storeICN"), function() {
        $("#shadeTransition").fadeIn(300, function() {
            loadStore(loadMenu2);
        });
    });
}

function setUpHillLevel() {
    unBindHandlers();
    $("#mainScreen1").html("");
    $("#mainScreen2").html("");
    //$("#hillLevel").html('<img src = "img/hillLandBG.png" style = "display: none"id = "bg1"><div id = "pauseScreen" style = "display: none;"><div style = "position: fixed; z-index: 1500; width: 100%; height: 100%; background-color: rgba(0,0,0,0.3);" id = "pauseScreenBG"></div><img src = "img/resumeGame.png" style = "position: fixed; z-index: 1501; height: 12%; left: 50%; -webkit-transform: translate(-50%); top: 20%; cursor: pointer;" id = "resumeGame" class = "btnHover"><img src = "img/quitGame.png" style = "position: fixed; z-index: 1501; height: 12%; left: 50%; -webkit-transform: translate(-50%); top: 35%; cursor: pointer;" id = "quitGame" class = "btnHover"><img src = "img/restartGame.png" style = "position: fixed; z-index: 1501; height: 12%; left: 50%; -webkit-transform: translate(-50%); top: 50%; cursor: pointer;" id = "restartGame" class = "btnHover"></div><img src = "img/pedalFWD.png" style = "position: fixed; z-index: 1000; height: 120px; right: 40px; bottom: 30px; cursor: pointer;" id = "pedalFWD"><img src = "img/pedalBWD.png" style = "position: fixed; z-index: 1000; height: 120px; left: 40px; bottom: 30px; cursor: pointer;" id = "pedalBWD"><img src = "img/pauseBtn.png" style = "position: fixed; z-index: 1000; height: 40px; width: 40px; top: 20px; right: 20px; cursor: pointer;" id = "pauseBtn"><div style = "position: fixed; z-index: 1001; left: 50%; overflow: hidden;" id = "fuelbar"><img src = "img/fuelGauge.png" style = "position: absolute; width: 100%; height: 100%;" id = "fuelbarIMG"></div><div id = "speedometerGroup" style = "position: fixed; z-index: 999; max-width: 40%; max-height: 140px; width: 40%; height: 140px; -webkit-transform: translate(-50%); bottom: 30px; left: 50%;"><img src = "img/speedometer.png" style = "position: absolute; max-width: 100%; max-height: 140px; bottom: 0px;" id = "speedometer"><img src = "img/speedometerPointer.png" style = "position: absolute; z-index: 1000; height: 25%; -webkit-transform-origin: center 87%;" id = "speedPointer"><div style = "position: fixed; z-index: 1001; left: 50%; overflow: hidden;" id = "fuelbar"><img src = "img/fuelGauge.png" style = "position: absolute; width: 100%; height: 100%;" id = "fuelbarIMG"></div></div>');
    $("#hillLevel").html(hillLevelHTML);
    refreshHover();

    function setUpUI() {
        $("#speedPointer").css("bottom", $("#speedometer").height() * 0.44);
        $("#speedPointer").css("left", $("#speedometerGroup").width()/2 - $("#speedPointer").width()/2);
        $("#fuelbar").css({bottom: $("#speedometer").height() * 0.045 + 30, height: $("#speedometer").height() * 0.284, width: $("#speedometer").width() * 0.97, left: $("#fuelbar").position().left - ($("#speedometer").width() * 0.97)/2});
        $("#fuelbarIMG").css({height: $("#speedometer").height() * 0.284, width: $("#speedometer").width() * 0.97});
    }
    setUpUI();

    $(window).on("resize", function() {
        setUpUI();
    });

    onDeviceReady3();
    setTimeout(function() {
        $("#shadeTransition").fadeOut(300);
    }, 400);

}

function onDeviceReady3() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Cars = {},
    myCar;
    // create an engine
    var engine = Engine.create({
        positionIterations: 6,
        velocityIterations: 4,
        constraintIterations: 6
    });

    var canvasBackGround = document.getElementById("bg1");

    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {height: $(window).height(), width: $(window).width(), wireframes: false, showBounds: false, hasBounds: true, showCollisions: false, pixelRatio: 4, canvasBG: canvasBackGround}
    });

    function unpause() {
        isStopped = false;
        accelerate();
        collisionHandler();
        changeFuel();
        myRunner.enabled = true;
        $("#pauseScreen").hide();
        $("#pauseScreenBG").off("touchend", unpause);
        $("#resumeGame").off("touchend", unpause);
        $("#quitGame").off("touchend", quit);
        $("#restartGame").off("touchend", restart);
    }

    function restart() {
        Matter.Engine.clear(engine);
        Matter.Render.stop(render);
        $('canvas').remove();
        $("#pauseScreen").hide();
        $("#pauseScreenBG").off("touchend", unpause);
        $("#resumeGame").off("touchend", unpause);
        $("#quitGame").off("touchend", quit);
        $("#restartGame").off("touchend", restart);
        myCar = undefined;
        restarted = true;
        $("#outOfFuel").hide();
        $("#fuelbar").css({width: $("#speedometer").width() * 0.97});
        $("#shadeTransition").fadeIn(300, function() {
            onDeviceReady3();
            setTimeout(function() {
                $("#shadeTransition").fadeOut(300);
            }, 400);
        });
    }

    function quit() {
        Matter.Engine.clear(engine);
        Matter.Render.stop(render);
        $('canvas').remove();
        $("#pauseScreen").hide();
        $("#quitGame").off("touchend", quit);
        $("#pauseScreenBG").off("touchend", unpause);
        $("#resumeGame").off("touchend", unpause);
        $("#restartGame").off("touchend", restart);
        myCar = undefined;
        restarted = true;
        $("#shadeTransition").fadeIn(300, function() {
            loadMenu();
            setTimeout(function() {
                $("#shadeTransition").fadeOut(300);
            }, 400);
        });
        
    }

    var isStopped = false;
    didEndInside($("#pauseBtn"), function() {
        if (!isStopped) {
            myRunner.enabled = false;
            isStopped = true;
            $("#pauseScreen").show();
            $("#pauseScreenBG").on("touchend", unpause);
            didEndInside($("#resumeGame"), unpause);
            didEndInside($("#restartGame"), restart);
            didEndInside($("#quitGame"), quit);
        }
    });

    function gameOver(deathType) {
        myRunner.enabled = false;
        isStopped = true;

        var finalDistance = Math.round((myCar.bodies[0].position.x - 500)/20);

        if (localStorage.bestDistanceHills) {
            if (localStorage.bestDistanceHills < finalDistance) {
                localStorage.bestDistanceHills = finalDistance;
            }
        } else {
            localStorage.bestDistanceHills = finalDistance;
        }

        $("#distanceTraveled").html(finalDistance + "m");
        $("#distanceTraveledBest").html(localStorage.bestDistanceHills + "m");
        $("#coinsCollectedTotal").html(localStorage.coinCount);
        $("#coinsCollected").html(localStorage.coinCount - preCoins);
        if (deathType == "fuel") {
            $("#gameOverIMG").attr("src", "img/outOfFuel.png");
        } else if (deathType == "flip") {
            $("#gameOverIMG").attr("src", "img/totaled.png");
        }
        $("#outOfFuel").fadeIn(800);
        didEndInside($("#retryB1"), restart);
        didEndInside($("#retryB2"), quit);
    }

    var preCoins = localStorage.coinCount;
    function changeFuel() {
        if (!isStopped) {
            if ($("#fuelbar").width() >= ($("#speedometer").width() * 0.97)*0.01) {
                $("#fuelbar").css({width: $("#fuelbar").width() - ($("#speedometer").width() * 0.97) * (2 - (Number(localStorage.car1FuelLVL) - 1)/24) * 0.004});
            } else {
                isAcceleratingFWD = false;
                isAcceleratingBWD = false;
                $("#pedalBWD").off();
                $("#pedalFWD").off();
                if (myCar.bodies[0].velocity.x <= 0) {
                    gameOver("fuel");
                }
            }
            setTimeout(changeFuel, 50 * (2 - (Number(localStorage.car1FuelLVL) - 1)/24));
        }
    }
    changeFuel();

    var initialEngineBoundsMaxX = render.bounds.max.x;
    var initialEngineBoundsMaxY = render.bounds.max.y;
    var centerX = -100;
    var centerY = -160;


    function camera() {
        if (!restarted) {
            webkitRequestAnimationFrame(camera);
        hero = myCar.bodies[0];

        render.bounds.min.x = centerX + hero.bounds.min.x;
        render.bounds.max.x = centerX + hero.bounds.min.x + initialEngineBoundsMaxX;

        render.bounds.min.y = centerY + hero.bounds.min.y;
        render.bounds.max.y = centerY + hero.bounds.min.y + initialEngineBoundsMaxY;
    }
    }

    function createCar1(car) {
        myCar = car;
        World.add(engine.world, [myCar]);
        camera();
    }

    function setupCar1(xx, yy, width, height, wheelSize) {
        
           /* body = Bodies.trapezoid(xx, yy, width, height, -0.3, { 
                collisionFilter: {
                    group: group
                },
                friction: 0.1,
                //chamfer: {
                //    radius: 10
                //},
                render: {
                    sprite: {
                        texture: 'img/car1Body.png',
                        xScale: 0.13,
                        yScale: 0.13,
                    }
                }
            });
*/
        //var body;

        var req = $.get("img/car1Body.svg");
        req.done(function(data) {
            var group = Matter.Body.nextGroup(true),
            wheelBase = 34.5,
            wheelAOffset = -width * 0.5 + wheelBase + 7,
            wheelBOffset = width * 0.5 - wheelBase + 3,
            wheelYOffset = 23;

            var car = Composite.create();
            var vertexSets = []
            car.width1 = width;
            car.height1 = height;
            car.rotationalForce = 1.5 - (Number(localStorage.car1BalanceLVL) - 1)/24;

            $(data).find('path').each(function(i, path) {
                var points = Matter.Svg.pathToVertices(path, 15);
                vertexSets.push([Matter.Vertices.scale(points, 0.13, 0.13)]);
            });

            var body = Matter.Bodies.fromVertices(xx, yy, vertexSets[0], {
                collisionFilter: {
                    group: group
                },
                friction: 0.1,
                density: 0.4,
                //chamfer: {
                //    radius: 10
                //},
                render: {
                    sprite: {
                        texture: 'img/car1Body.png',
                        xScale: 0.13,
                        yScale: 0.13,
                        showAsOne: true
                    }
                }
            }, false);

           /* var imgBody = Bodies.trapezoid(xx, yy, width, height, -0.3, { 
                collisionFilter: {
                    group: -50,
                    category: -1,
                    mask: 50
                },
                friction: 0,
                //chamfer: {
                //    radius: 10
                //},
                render: {
                    sprite: {
                        texture: 'img/car1Body.png',
                        xScale: 0.13,
                        yScale: 0.13,
                    }
                }
            });
*/
            var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
                collisionFilter: {
                    group: group
                },
                friction: 0.8 * (1 + (Number(localStorage.car1TractionLVL) - 1)/12),
                density: 0.2,
                render: {
                    sprite: {
                        texture: 'img/car1Wheel.png',
                        xScale: 0.14,
                        yScale: 0.14,
                    }
                }
            });
                        
            var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
                collisionFilter: {
                    group: group
                },
                friction: 0.8 * (1 + (Number(localStorage.car1TractionLVL) - 1)/12),
                density: 0.2,
                render: {
                    sprite: {
                        texture: 'img/car1Wheel.png',
                        xScale: 0.14,
                        yScale: 0.14,
                    }
                }
            });
                        
            var axelA = Constraint.create({
                bodyA: body,
                pointA: { x: wheelAOffset, y: wheelYOffset },
                bodyB: wheelA,
                stiffness: 0.2
            });
                            
            var axelB = Constraint.create({
                bodyA: body,
                pointA: { x: wheelBOffset, y: wheelYOffset },
                bodyB: wheelB,
                stiffness: 0.2
            });
/*
            var axelC = Constraint.create({
                bodyA: imgBody,
                pointA: { x: wheelAOffset, y: wheelYOffset },
                bodyB: wheelA,
                stiffness: 1
            });
                            
            var axelD = Constraint.create({
                bodyA: imgBody,
                pointA: { x: wheelBOffset, y: wheelYOffset },
                bodyB: wheelB,
                stiffness: 1
            });*/
            
            Composite.addBody(car, body);
           // Composite.addBody(car, imgBody);
            Composite.addBody(car, wheelA);
            Composite.addBody(car, wheelB);
            Composite.addConstraint(car, axelA);
            Composite.addConstraint(car, axelB);
            //Composite.addConstraint(car, axelC);
            //Composite.addConstraint(car, axelD);
            
            createCar1(car);
        });
            //body = Bodies.fromVertices(xx, yy, )
    };

    // create two boxes and a ground
    //var boxA = Bodies.rectangle(400, 200, 80, 80);
    //var boxB = Bodies.rectangle(450, 50, 80, 80);
  //  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
   // var coorList = [[674, 561], [704, 514], [748, 475], [802, 450], [852, 451], [903, 470], [951, 508], [995, 542], [1042, 573]];
   // var newCoorList = [];
   // for (var sc = 0; sc < coorList.length; sc++) {
  //      newCoorList.push({x: coorList[sc][0], y: coorList[sc][1]});
  //  }
   // var newGround = Bodies.fromVertices(800 - 674, 1220 - 561, newCoorList, {isStatic: true}, true);
    //var shapeBody = Bodies.fromVertices(0, 0, shape[1], {isStatic: true}, true);
    //    Composite.addBody(newGround, shapeBody);
    //var newGround = Bodies.fromVertices(400, 410, [{x: 0, y: 0}, {x: 53, y: 30}, {x: 106, y: 66}, {x: 154, y: 100}], {isStatic: true}, true);
    
    //console.log(Cars.car2);
    setupCar1(500, 90, 200, 60, 16);
   

    /*$(window).keydown(function(e) {
        console.log(e.which);
        var key = e.which;
        if (key == 39)  {
            //Matter.Body.applyForce(myCar.bodies[0], myCar.bodies[0].position, {x: 0.06, y: 0.03});
            Matter.Body.setAngularVelocity(myCar.bodies[1], myCar.bodies[1].angularVelocity + 0.07);
            Matter.Body.setAngularVelocity(myCar.bodies[2], myCar.bodies[2].angularVelocity + 0.07);
            //Matter.Body.rotate(myCar.bodies[2], -2);
        }
        else if (key == 37) {
            //Matter.Body.applyForce(myCar.bodies[0], myCar.bodies[0].position, {x: -0.06, y: -0.03});
            Matter.Body.setAngularVelocity(myCar.bodies[1], myCar.bodies[1].angularVelocity - 0.07);
            Matter.Body.setAngularVelocity(myCar.bodies[2], myCar.bodies[2].angularVelocity - 0.07);
        } 
    });*/

    var restarted = false;
    var maxVelocity = 4;
    function setSpeedometer() {
        if (myCar != undefined) {
            //var mag = Matter.Vector.magnitude(myCar.bodies[0].velocity);
            var mag = Math.abs(myCar.bodies[0].velocity.x);
            if (mag > maxVelocity) {
                maxVelocity = mag;
            }
            var percent = mag / maxVelocity;
            var angle = 180 * percent - 90;
            $("#speedPointer").css("-webkit-transform", "rotate(" + angle + "deg)");
        }
        if (!restarted) {
            setTimeout(setSpeedometer, 5);
        }
    }
    setSpeedometer();


    var isAcceleratingFWD = false;
    var isAcceleratingBWD = false;
    var amount = 0.07 * (1 + (Number(localStorage.car1EngineLVL) - 1)/8);

    wheel1Collision = false;
    wheel2Collision = false;
    var theGround;

    var minPosition = -5000;

    var minLimit = Matter.Bodies.rectangle(minPosition, -300, 10, 1900, {
        isStatic: true,
        render: {
            visible: false
        }
    });
    World.add(engine.world, minLimit);

    var notColliding = 0;

    function accelerate() {
        if (!isStopped) {
            if (myCar != undefined) {
                if (minPosition < myCar.bodies[0].position.x - 1900) {
                    minPosition = myCar.bodies[0].position.x - 1900;
                    Matter.Body.setPosition(minLimit, {x: minPosition, y: -300});
                }
                if (!(wheel1Collision && wheel2Collision)) {
                    notColliding += 1;
                }
                if (isAcceleratingFWD && isAcceleratingBWD) {
                    if (wheel1Collision) {
                        notColliding = 0;
                        Matter.Body.setAngularVelocity(myCar.bodies[1], 0);
                    }
                    if (wheel2Collision) {
                        notColliding = 0;
                        Matter.Body.setAngularVelocity(myCar.bodies[2], 0);
                    }
                } else if (isAcceleratingFWD) {
                    if (wheel1Collision) {
                        notColliding = 0;
                        Matter.Body.setAngularVelocity(myCar.bodies[1], myCar.bodies[1].angularVelocity + amount);
                    }
                    if (wheel2Collision) {
                        notColliding = 0;
                        Matter.Body.setAngularVelocity(myCar.bodies[2], myCar.bodies[2].angularVelocity + amount);
                    }
                    Matter.Body.applyForce(myCar.bodies[0], {
                            x: Matter.Vertices.centre(myCar.bodies[0].vertices).x - Math.cos(myCar.bodies[0].angle) * 0.4 * myCar.width1,
                            y: Matter.Vertices.centre(myCar.bodies[0].vertices).y + Math.sin(myCar.bodies[0].angle) * 0.4 * myCar.width1
                        },
                        {
                            x: Math.sin(myCar.bodies[0].angle) * myCar.rotationalForce,
                            y: Math.cos(myCar.bodies[0].angle) * myCar.rotationalForce
                    });
                } else if (isAcceleratingBWD) {
                    if (wheel1Collision) {
                        notColliding = 0;
                        Matter.Body.setAngularVelocity(myCar.bodies[1], myCar.bodies[1].angularVelocity - amount);
                    }
                    if (wheel2Collision) {
                        notColliding = 0;
                        Matter.Body.setAngularVelocity(myCar.bodies[2], myCar.bodies[2].angularVelocity - amount);
                    }
                    Matter.Body.applyForce(myCar.bodies[0], {
                            x: Matter.Vertices.centre(myCar.bodies[0].vertices).x + Math.cos(myCar.bodies[0].angle) * 0.4 * myCar.width1,
                            y: Matter.Vertices.centre(myCar.bodies[0].vertices).y - Math.sin(myCar.bodies[0].angle) * 0.4 * myCar.width1
                        },
                        {
                            x: Math.sin(myCar.bodies[0].angle) * myCar.rotationalForce * -1,
                            y: Math.cos(myCar.bodies[0].angle) * myCar.rotationalForce * -1
                    });
                }
                if (notColliding > 100 && ((myCar.bodies[0].angle > 2.37 && myCar.bodies[0].angle < 3.93) || (myCar.bodies[0].angle < -2.36 && myCar.bodies[0].angle > -3.93))) {
                    gameOver("flip");
                }
            }
            setTimeout(accelerate, 40);
        }
    }
    accelerate();

   /* $("#pedalFWD").on("mouseover", function() {
        isAccelerating = true;
        amount = 0.07;
        accelerate();
    });

    $("#pedalBWD").on("mouseover", function() {
        isAccelerating = true;
        amount = -0.07;
        accelerate();
    });

    $("#pedalFWD").on("mouseout", function() {
        isAccelerating = false;
        amount = 0;
    });

    $("#pedalBWD").on("mouseout", function() {
        isAccelerating = false;
        amount = 0;
    });*/

    $("#pedalFWD").on("touchstart", function() {
        isAcceleratingFWD = true;
    });

    $("#pedalBWD").on("touchstart", function() {
        isAcceleratingBWD = true;
    });

    $("#pedalFWD").on("touchend", function() {
        isAcceleratingFWD = false;
    });

    $("#pedalBWD").on("touchend", function() {
        isAcceleratingBWD = false;
    });

    function wheelCollisions() {
        webkitRequestAnimationFrame(wheelCollisions);
        if (myCar != undefined) {
            var wheel1CollisionNew = false;
            var wheel2CollisionNew = false;
            
            $.each(engine.pairs.collisionActive, function(index, value) {
                if ((value.bodyA.parent.id == theGround.id || value.bodyB.parent.id == theGround.id) && (value.bodyA.id == myCar.bodies[1].id || value.bodyB.id == myCar.bodies[1].id)) {
                    wheel1CollisionNew = true;
                }
                if ((value.bodyA.parent.id == theGround.id || value.bodyB.parent.id == theGround.id) && (value.bodyA.id == myCar.bodies[2].id || value.bodyB.id == myCar.bodies[2].id)) {
                    wheel2CollisionNew = true;
                }
            });
            
            wheel1Collision = wheel1CollisionNew;
            wheel2Collision = wheel2CollisionNew;
        }
    }

    function loadPowerUps(powerArray) {
        var allPowerUps = [];
        for (var n = 0; n < powerArray.coins.length; n++) {
            var pow = Matter.Bodies.circle(powerArray.coins[n][0], powerArray.coins[n][1], 15, {
                render: {
                    sprite: {
                        texture: "img/coin" + powerArray.coins[n][2] + ".png",
                        //texture: "img/fuel.png",
                        xScale: 0.13,
                        yScale: 0.13
                    }
                },
                isStatic: true,
                density: 0,
                restitution: 0,
                collisionFilter: {
                    group: -1,
                    mask: -50,
                }

            });
            pow.powerUpType = "coin";
            pow.coinValue = powerArray.coins[n][2];
            World.add(engine.world, pow);
            //console.log(Matter.Detector.canCollide(coin.collisionFilter, theGround.collisionFilter));
            allPowerUps.push(pow);
        }
        for (var pr = 0; pr < powerArray.fuel.length; pr++) {
            var pow = Matter.Bodies.circle(powerArray.fuel[pr][0], powerArray.fuel[pr][1], 15, {
                render: {
                    sprite: {
                        texture: "img/fuel.png",
                        xScale: 0.13,
                        yScale: 0.13
                    }
                },
                isStatic: true,
                density: 0,
                restitution: 0,
                collisionFilter: {
                    group: -1,
                    mask: -50,
                }
            });
            pow.powerUpType = "fuel";
            World.add(engine.world, pow);
            //console.log(Matter.Detector.canCollide(coin.collisionFilter, theGround.collisionFilter));
            allPowerUps.push(pow);
        }

        //console.log(allCoins);
        return allPowerUps;
    }
    var powerUps;

    function collisionLists(coin, ground) {
        var i = 1;
        while (i < ground.parts.length) {
            if (Matter.SAT.collides(coin.parts[0], ground.parts[i]).collided) {
                //console.log(Matter.Detector.canCollide(coin.collisionFilter, ground.parts[i].collisionFilter));
                //console.log(Matter.SAT.collides(coin, ground.parts[i]));
                return true;
            }
            i += 1;
        }
        return false;
    }
    
    function getCoinYVal(xval, yvalMax, yvalMin, step, ground) {
        var tempCoin = Matter.Bodies.circle(xval, yvalMin, 15);
        World.add(engine.world, tempCoin);
        if (!collisionLists(tempCoin, theGround)) {
            Matter.Composite.remove(engine.world, tempCoin);
            var lim = undefined;
            var checkYval = yvalMin;
            while (lim === undefined && checkYval < yvalMax) {
                checkYval += step;
                tempCoin = Matter.Bodies.circle(xval, checkYval, 15);
                if (collisionLists(tempCoin, theGround)) {
                    lim = checkYval;
                    Matter.Composite.remove(engine.world, tempCoin);
                    return checkYval - 20;
                } else {
                    Matter.Composite.remove(engine.world, tempCoin);
                    //console.log({x: xval, y: checkYval - 70})
                }
            }
        } else {
            return -70;
        }
    }


    $.get("img/leveltest1.svg").done(function(data) {
        var vertexSets = [],
            color = Matter.Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

        $(data).find('path').each(function(i, path) {
            var points = Matter.Svg.pathToVertices(path, 15);
            vertexSets.push(Matter.Vertices.scale(points, 0.4, 0.4));
        });

        theGround = Matter.Bodies.fromVertices(3000, 200, vertexSets, {
            render: {
                sprite: {
                    texture: 'img/level1overlay.png',
                    xScale: 0.40,
                    yScale: 0.40,
                    showAsOne: true,
                    yOffset: 0.019
                }
            },
            isStatic: true
        }, true);
        //console.log(theGround.parts.length);

        World.add(engine.world, theGround);
        wheelCollisions();

        var posArray2 = [];
        for (var y = 0; y < 5; y++) {
            var xval = 1000 + 2400*y;
            var yval = getCoinYVal(xval, 700, -400, 1, theGround);
            if (!yval) {
                break;
            }
            posArray2.push([xval, yval]);
        }
        /*for (var y = 0; y < 5; y++) {
            for (var t = 0; t < 5; t++) {
                var xval = 1000 + 1800*y + 90*t;
                posArray.push([xval, getCoinYVal(xval, 700, -400, 1, theGround), 5]);
                //console.log("success");
            }
        }*/
        var posArray = {coins: [[1000, -4, 5], [1090, -73, 5], [1180, -136, 5], [1270, -170, 5],[1360, -188, 5],[2800, -129, 5],[2890, -157, 5],[2980, -184, 5],[3070, -196, 5],[3160, -208, 5],[4600, 26, 5],[4690, -10, 5],[4780, -119, 5],[4870, -297, 5],[4960, -400, 5]], fuel: posArray2};
        powerUps = loadPowerUps(posArray);
    });


    //Matter.Body.setVertices(newGround, [{x: 410, y: 610}, {x: 490, y: 610}, {x: 750, y: 400}]);
    //var newGroundVertices = Matter.Vertices.create([{x: 410, y: 610}, {x: 490, y: 610}, {x: 750, y: 400}], newGround);
    // add all of the bodies to the world


    //


    //
    //Mouse.setOffset(mouseConstraint.mouse, render.bounds.min);

    function changeMoneyVal(amount) {
        if (localStorage.coinCount) {
            localStorage.coinCount = Number(localStorage.coinCount) + amount;
        } else {
            localStorage.coinCount = 0;
        }
        $("#gameCoins").html(localStorage.coinCount);
        $("#gameCoinsStroke").html(localStorage.coinCount);
    }
    changeMoneyVal(0);

    function powerUpCollection(powerUp) {
        //console.log(powerUp);
        if (powerUp.powerUpType == "coin") {
            changeMoneyVal(powerUp.coinValue);
            Matter.Composite.remove(engine.world, powerUp);
            powerUps.splice(powerUps.indexOf(powerUp), 1);
        } else if (powerUp.powerUpType == "fuel") {
            $("#fuelbar").css({width: $("#speedometer").width() * 0.97});
            Matter.Composite.remove(engine.world, powerUp);
            powerUps.splice(powerUps.indexOf(powerUp), 1);
        }
    }
    var shouldY = true;
    function collisionHandler() { 
        if (powerUps != undefined && myCar != undefined) {
            var powerUp = powerUps.filter(function(object) {
                return Matter.Bounds.overlaps(object.bounds, myCar.bodies[0].bounds);
            });
            if (powerUp.length > 0) {
                powerUpCollection(powerUp[0]);
            }
        }
        if (!isStopped) {
            setTimeout(collisionHandler, 40);
        }
    }
    collisionHandler();


    // run the engine
    var myRunner = Matter.Runner.run(engine);

    // run the renderer
    Render.run(render);
}



























