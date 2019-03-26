
const adContent = "<p class='adp'><img class='insert' src='./ad.jpg' height='100px'></p>";
const relatedContent = "<p class='adp'><img class='insert' src='./related.png' height='100px'></p>";
const recommendedContent = "<p class='adp'><img class='insert' src='./recommended.png' height='100px'></p>";

const ruleset = {
    article: [
        {
            type: "related_content",
            position: "absolute",
            value: 2,
            conditions: {
                minimumParagraphs: 4
            },
            content: relatedContent,
        },
        {
            type: "recommended_content",
            position: "relative",
            value: 50,
            conditions: {
                minimumParagraphs: 3
            },
            content: recommendedContent,
        }
    ],
    vertical: [
        {
            type: "advertisement",
            position: "absolute",
            value: 3,
            conditions: {
                minimumParagraphs: 5,
                required: {
                    showAds: true
                }
            },
            repeat: {
                total: 2
            },
            content: adContent,
        },
        {
            type: "related_content",
            position: "relative",
            value: 50,
            conditions: {
                minimumParagraphs: 4
            },
            content: relatedContent,
        },
        {
            type: "recommended_content",
            position: "relative",
            value: 50,
            conditions: {
                minimumLead: 4,
                minimumParagraphs: 3
            },
            content: recommendedContent,
        }
    ],
    dickens: [
        {
            type: "advertisement",
            position: "absolute",
            value: 2,
            conditions: {
                minimumParagraphs: 4
            },
            content: adContent,
        },
        {
            type: "recommended_content",
            position: "repeating",
            value: 5,
            conditions: {
                minimumParagraphs: 3,
                minimumTail: 3
            },
            content: recommendedContent,
        }
    ]
};


function processRules() {
    const contentArray = [
        "The Northern Lights are going south this weekend.",
        "A geomagnetic storm, caused by a cloud of charged particles ejected from the sun, may bring the aurora borealis as far south as Iowa, Colorado and Washington on Saturday, as these particles bombard Earth, according to the National Oceanic and Atmospheric Administration's Space Weather Prediction Center.",
        "\"If the storm is oriented properly, we could have a chance for auroras for several days after impact,\" said Tamitha Skov, a space weather scientist based in Los Angeles.",
        "Auroras form when charged particles from the sun collide with Earth's atmosphere. When there is an influx of charged particles during geomagnetic storms, this can supercharge the aurora's glow, according to Terry Onsager, a physicist at the Space Weather Prediction Center.",
        "\"It's like a big battery driving electricity through the Earth's system,\" he said. \"And when that flows through the atmosphere, the atmosphere glows like a neon light.\"",
        "The particles are the result of a coronal mass ejection, an outpouring of plasma from the sun's atmosphere that was detected by NOAA on Wednesday.",
        "\"This is exciting news, considering we haven't had a decently sized Earth-directed solar storm launch for quite some time,\" Skov said, adding that geomagnetic storms are less common during the current period of the sun's 11-year activity cycle.",
        "Onsager said the storm could arrive Saturday morning, which means it may not be visible. But he and Skov both said that prediction could change.",
        "\"Space weather forecasting today is very much like terrestrial weather forecasting was back in the 1960s,\" Skov said. In other words, the forecast may be off by as much as 12 hours in either direction.",
        "Onager and Skov recommend tracking the aurora in real time using tools like NOAA's OVATION Aurora Forecast Models, which predict the Northern Lights' location anywhere from a few days to a half hour in advance.",
        "Like the sun, auroras rise in the east and sets in the west, Skov said. So, if you're looking for it before midnight, she recommends looking east. After midnight, she says, your best bet is to look west.",
        "You can find more aurora viewing tips and tricks on the Space Weather Prediction Center's website.",
        "The Northern Lights are going south this weekend.",
        "Auroras form when charged particles from the sun collide with Earth's atmosphere. When there is an influx of charged particles during geomagnetic storms, this can supercharge the aurora's glow, according to Terry Onsager, a physicist at the Space Weather Prediction Center.",
    ];
    var contentDiv = document.getElementById("contentDiv");
    contentDiv.innerHTML = "";
    var contentType = document.getElementById("chooser").value;
    if (contentType == "") {
        console.log(ruleset);
        contentDiv.innerHTML = contentArray.join("<br />");
    }
    if (!(contentType in ruleset)) {
        console.log("No rule defined for this content type.");
        return;
    } else {
        console.log('Ruleset for ' + contentType);
        console.log(ruleset[contentType]);
        let previousPos = 0;
        ruleset[contentType].forEach(rule => {
            // Refresh content length.
            contentLength = contentArray.length;

            if (rule.position == "absolute") {
                if (contentLength >= rule.conditions.minimumParagraphs) {
                    contentArray.splice(rule.value, 0, rule.content);
                    previousPos = rule.value + 1;
                }
            }
            if (rule.position == "relative") {
                recPos = Math.floor((contentLength - previousPos) * rule.value / 100);
                if (recPos >= rule.conditions.minimumParagraphs) {
                    contentArray.splice(previousPos + recPos, 0, rule.content);
                    previousPos = previousPos + recPos + 1;
                } else if (recPos >= rule.conditions.minimumLead) {
                    contentArray.splice(previousPos + recPos, 0, rule.content);
                }
            }
            if (rule.position == "repeating") {
                for (repeat = 0; repeat < rule.value; repeat++) {
                    // Check if there are enough trailing paragraphs to continue.
                    if (contentLength - previousPos >= rule.conditions.minimumTail) {
                        // Progress through the remaining paragraphs and add content at the specified intervals.
                        for (index = 0; index < rule.conditions.minimumParagraphs; index++) {
                            if (index % rule.conditions.minimumParagraphs == 0) {
                                contentArray.splice(previousPos + rule.conditions.minimumParagraphs, 0, rule.content);
                                previousPos = previousPos + rule.conditions.minimumParagraphs + 1;
                            }
                        }
                    }
                }
            }
        });
    }
    contentDiv.innerHTML = contentArray.join("<br />");
}
