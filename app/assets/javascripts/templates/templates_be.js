$(document).ready(function() {
    $("body")
        .on("submit", "#create_template_form", submitTemplateForm)
        .on("submit", "#delete_question_form", submitDeleteQuestionForm)
        .on("submit", "#add_question_form", submitAddQuestionForm)
        .on("submit", "#duplicate_question_form", submitDuplicateQuestionForm)
        .on("submit", "#create_template_form", submitTemplatePreviewForm)
});

function submitTemplateForm(){
    let create_template_form = $(this);

    $.post(create_template_form.attr("action"), create_template_form.serialize(), function(json_data){
        if(json_data.status){
            console.log(json_data.html);
            /* this is how you use html from the backend */
            $(".template_questions").html(json_data.html);
            $(".template_question_type").selectpicker("refresh");
        }
    }, "json");

    return false;
};

function submitDeleteQuestionForm(){
    let delete_question_form = $(this);

    $.post(delete_question_form.attr("action"), delete_question_form.serialize(), function (json_data) {
        if(json_data.status){
            /* this is how you use html from the backend */
            // $(".template_questions").html(json_data.html);

            /** Todo: Find question with json_data.question_id and remove it from view */
            //$(`#question_id_${json_data.question_id}`).remove();
            $(".template_questions").html(json_data.html);
        }
    }, "json");

    return false;
};

function submitAddQuestionForm(){
    let add_question_form = $(this);
    let template_body_offset = $("#create_template_body").get(0).scrollHeight

    $.post(add_question_form.attr("action"), add_question_form.serialize(), function (json_data) {
        if(json_data.status){
            console.log(json_data.html);
            /* this is how you use html from the backend */
            $(".template_questions").html(json_data.html);
            $(".template_question_type").selectpicker("refresh");
        }
    }, "json");

    scrollToTargetOffset(template_body_offset);

    return false;
}

function submitDuplicateQuestionForm(){
    let duplicate_question_form = $(this);
    let template_body_offset = $("#create_template_body").get(0).scrollHeight

    $.post(duplicate_question_form.attr("action"), duplicate_question_form.serialize(), function (json_data) {
        if(json_data.status){
            console.log(json_data.html);
            /* this is how you use html from the backend */
            $(".template_questions").html(json_data.html);
            $(".template_question_type").selectpicker("refresh");
        }
    }, "json");

    scrollToTargetOffset(template_body_offset);
    
    return false;
}

function submitTemplatePreviewForm(){
    let create_template_form = $(this);

    $.post("/process_template_preview", create_template_form.serialize(), function (json_data) {
        if(json_data.status){
            console.log(json_data.html);
            /* this is how you use html from the backend */
            $(".preview_modal_content").html(json_data.html);
            $(".template_question_type").selectpicker("refresh");
        }
    }, "json");

    return false;  
}
