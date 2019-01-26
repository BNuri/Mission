$.getJSON( '/api/fetchProblem',
  function (data) {
    console.log(data.problems);
    const arr = data.problems;
    arr.forEach(function(i) {
      let answerType = '';
      if(i.type == 1) {
        let choiceArr = i.choices.substring(1,i.choices.length-1).split(',');
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
      }else {
        answerType = `<div class="tmp1-answer-stub-text">
                <span class="label"></span>
                <input type="text" class="value" name="${i.id}">
              </div>`;
      }

      let str = `<div class="tmp1-problem-stub">
              <span class="id">${i.id}</span>.
              <span class="problem-text">${i.problem_text}</span>
              <div class="answer-user">${answerType}</div>
              <div class="answer-right"></div>
            </div>`;

      $(str).appendTo('.problem');
    })
  }
)
  $(function() {
    $(".submit").click(function() {
      let formData = $('#form').serialize();
      console.log(formData);
      $.ajax({
        type: "POST",
        url: '/api/submit',
        data: formData,
        success: function (data) {
          console.log(data.results);
          let submitResult = '';
          data.results.forEach((result) => {
            let ox = 'X';
            if(result.result) ox = 'O';
            submitResult += `<p>${result.id}. ${ox}</p>`
          });
          $(submitResult).appendTo('.main-result');

          $(".submit").attr('disabled', true);
        }
      })
    })
  })
