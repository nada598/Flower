document.addEventListener("DOMContentLoaded", function () {
    const legendMap = {
        "ا": { image: "images/flower-a.png" },
        "ب": { image: "images/flower-b.png" },
        "ج": { image: "images/flower-c.png" },
        "د": { image: "images/flower-d.png" }
    };

    function getSelections() {
        let selectedLetters = [];
        for (let i = 1; i <= 6; i++) {
            let input = document.querySelector('input[name="q' + i + '"]:checked');
            if (input) selectedLetters.push(input.getAttribute("data-letter"));
        }
        return selectedLetters;
    }

    function showResult() {
        let selectedLetters = getSelections();
        let counts = {};
        selectedLetters.forEach(val => {
            counts[val] = (counts[val] || 0) + 1;
        });

        let maxCount = Math.max(...Object.values(counts));
        let mostRepeated = Object.entries(counts)
            .filter(([letter, count]) => count === maxCount);

        let resultDiv = document.getElementById('result-message');

        if (selectedLetters.length === 6 && maxCount > 1) {
            let html = `<div class="user-result"><div class="repeated-title"></div>`;
            
            // ✅ Only show one flower even in tie
            let [letter] = mostRepeated[0];
            if (legendMap[letter]) {
                html += `
                    <div class="flower-result-box">
                        <img src="${legendMap[letter].image}" alt="${letter}" class="flower-result-img">
                    </div>
                `;
            }

            html += `<div class="flower-note">
                ستجد تفاصيل الوردة التي تمثل شخصيتك على الشجرة عند المدخل
            </div>`;
            resultDiv.innerHTML = html;

        } else if (selectedLetters.length === 6) {
            resultDiv.innerHTML = "<span style='color:#1e7c3a;font-weight:bold;'>كل الإجابات مختلفة!</span>";
        } else {
            resultDiv.innerHTML = "";
        }
    }

    document.getElementById('calculate-btn').addEventListener('click', function (e) {
        let selectedLetters = getSelections();
        if (selectedLetters.length < 6) {
            alert("يرجى الإجابة على جميع الأسئلة");
            return;
        }

        document.getElementById('survey-form').style.display = "none";
        showResult();
        document.getElementById('result-message').scrollIntoView({ behavior: "smooth" });
    });
});
