$.getJSON('/api/fetchProblem',
  function(data) {
    const arr = data.problems;
    arr.forEach(function(i) {
      let answerType = '',
        realAnswerType = '';
      if (i.type == 1) {
        let choiceArr = i.choices.substring(1, i.choices.length - 1).split(',');
        answerType = `<div class="tmp1-answer-stub-choice">
                <span class="label"></span>
                <input type="radio" value="1" name="${i.id}">
                <span class="choice">${choiceArr[0]}</span>
                <input type="radio" value="2" name="${i.id}">
                <span class="choice">${choiceArr[1]}</span>
                <input type="radio" value="3" name="${i.id}">
                <span class="choice">${choiceArr[2]}</span>
                <input type="radio" value="4" name="${i.id}">
                <span class="choice">${choiceArr[3]}</span>
                <input type="radio" value="5" name="${i.id}">
                <span class="choice">${choiceArr[4]}</span>
                </div>`;
        realAnswerType = `<div class="tmp1-answer-stub-choice">
                        <span class="label"></span>
                        <input type="radio" value="1" name="r${i.id}" class="${i.type}">
                        <span class="choice">${choiceArr[0]}</span>
                        <input type="radio" value="2" name="r${i.id}" class="${i.type}>
                        <span class="choice">${choiceArr[1]}</span>
                        <input type="radio" value="3" name="r${i.id}" class="${i.type}>
                        <span class="choice">${choiceArr[2]}</span>
                        <input type="radio" value="4" name="r${i.id}" class="${i.type}>
                        <span class="choice">${choiceArr[3]}</span>
                        <input type="radio" value="5" name="r${i.id}" class="${i.type}>
                        <span class="choice">${choiceArr[4]}</span>
                        </div>`;
      } else {
        answerType = `<div class="tmp1-answer-stub-text">
                <span class="label"></span>
                <input type="text" class="value" name="${i.id}">
                </div>`;
        realAnswerType = `<div class="tmp1-answer-stub-text">
                        <span class="label"></span>
                        <input type="text" class="value ${i.type}" name="r${i.id}">
                        </div>`;
      }

      let str = `<div class="tmp1-problem-stub">
              <span class="id">${i.id}</span>.
              <span class="problem-text">${i.problem_text}</span>
              <div class="answer-user">${answerType}</div>
              <div class="answer-right">${realAnswerType}</div>
              </div>`;

      $(str).appendTo('.problem');
      $(".answer-right").css('display', 'none');
    })
  }
)
$(function() {
  $(".submit").click(function() {
    let formData = $('#form').serialize();
    $.ajax({
      type: "POST",
      url: '/api/submit',
      data: formData,
      success: function(data) {
        console.log(data.results);
        $(".answer-right").css('display', '');
        $(".answer-user .label").text('나의 답:');
        $(".answer-right .label").text('정답:');
        let submitResult = '';
        data.results.forEach((result) => {
          submitResult += `<div class="tmp1-result-stub">
            				  <span class="id">${result.id}</span>.
            				    <span class="result">${result.result ? 'O' : 'X'}</span>
            			     </div>`;
          if($(`input:radio[name="r${result.id}"]`).hasClass("1")){
            $(`input:radio[name="r${result.id}"]:input[value=${result.answer}]`).attr("checked", true);
          }
           if($(`:text[name="r${result.id}"]`).hasClass("2")){
            $(`:text[name="r${result.id}"]`).val(`${result.answer}`);
           }
        });
        $(submitResult).appendTo('.main-result');

        $(".submit").attr('disabled', true);
      }
    })
  })
})
