
    jQuery.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/0Atp5ry3z0BdLdGdFNUJuWmhSNHJaSENuZE4yQms5WEE/3/public/values?alt=json", function(data) {
        var sponsors = parseInt(data.feed.entry[0]['gsx$d8rulessponsors'].$t, 10);
        var dfundus = parseInt(data.feed.entry[0]['gsx$drupalfund.us'].$t, 10);
        var m1 = parseInt(data.feed.entry[1]['gsx$m1'].$t, 10);
        var m2 = parseInt(data.feed.entry[1]['gsx$m2'].$t, 10);
        var m3 = parseInt(data.feed.entry[1]['gsx$m3'].$t, 10);
        renderProgressChart(sponsors, dfundus, m1);
        renderProgressChartMilestones(sponsors, dfundus, m1, m2, m3);
    });
    function renderProgressChart(sponsors, dfundus, m1) {
        var percent_sponsors = (sponsors / m1) * 100;
        var percent_dfundus = ((dfundus / m1) + (sponsors / m1)) * 100;
        var total_percent = Math.round(((dfundus + sponsors) / m1) * 100);
        jQuery("#rules-progress .rules-progress__bar--sponsors").css("width", percent_sponsors + "%");
        jQuery("#rules-progress .rules-progress__bar--sponsors .rules-progress__amount").html(sponsors + " &euro;");
        jQuery("#rules-progress .rules-progress__bar--dfundus").css("width", percent_dfundus + "%");
        if ((percent_dfundus - percent_sponsors) >= 20) {
            jQuery("#rules-progress .rules-progress__bar--dfundus .rules-progress__text").show();
            jQuery("#rules-progress .rules-progress__bar--dfundus .rules-progress__amount").html(dfundus + " &euro;");
        }
        jQuery("#rules-progress .rules-progress__goal").html(m1 + " &euro;");
        jQuery("#rules-progress .rules-progress__total-percent").html(total_percent + "%");
    }
    function renderProgressChartMilestones(sponsors, dfundus, m1, m2, m3) {
        var total = m1 + m2 + m3;
        var percent_sponsors = (sponsors / total) * 100;
        var percent_dfundus = ((dfundus / total) + (sponsors / total)) * 100;
        var total_percent = Math.round(((dfundus + sponsors) / total) * 100);
        jQuery("#rules-progress--milestones .rules-progress__bar--sponsors").css("width", percent_sponsors + "%");
        if (percent_sponsors >= 15) {
            jQuery("#rules-progress--milestones .rules-progress__bar--sponsors .rules-progress__text").show();
            jQuery("#rules-progress--milestones .rules-progress__bar--sponsors .rules-progress__amount").html(sponsors + " &euro;");
        }
        jQuery("#rules-progress--milestones .rules-progress__bar--dfundus").css("width", percent_dfundus + "%");
        if ((percent_dfundus - percent_sponsors) >= 20) {
            jQuery("#rules-progress--milestones .rules-progress__bar--dfundus .rules-progress__text").show();
            jQuery("#rules-progress--milestones .rules-progress__bar--dfundus .rules-progress__amount").html(dfundus + " &euro;");
        }
        jQuery.each([m1, m1 + m2], function(index, value) {
            var percent_milestone = (value / total) * 100;
            jQuery("#rules-progress--milestones .rules-progress__milestone--" + (index+1))
                .css("left", percent_milestone + "%")
                .css("opacity", "1");
        });
        jQuery("#rules-progress--milestones .rules-progress__goal").html(total + " &euro;");
        jQuery("#rules-progress--milestones .rules-progress__total-percent").html(total_percent + "%");
    }
