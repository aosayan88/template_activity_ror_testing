var question_id = 0;
var carousel_index = 0;
var current_index = 0;
var carouselEl = $('.carousel');
var carouselItems = carouselEl.find('.item');

$(document).ready(function () {
    $("body")
        .on("change", "#template_title", changeTemplateTitle)                       /* This function will change breadcrumb template title */
        .on("click", ".add_question_btn", addQuestion)                              /* This function will add a question to the template */
        .on("changed.bs.select", ".template_question_type", setQuestionType)        /* This function will set options for selected question type */
        .on("click", ".duplicate_btn_icon", duplicateQuestion)                      /* This function will duplicate the selected question */
        .on("click", ".delete_btn_icon", openDeleteModal)                           /* This function will open delete modal */
        .on("click", ".delete_modal_delete_btn", deleteQuestion)                    /* This function will delete the selected question */
        .on("click", ".add_question_option", addMultipleChoiceOption)               /* This function add option using 'add option button' */
        .on("click", ".question_option_delete_btn", deleteQuestionOption)           /* This function will delete selected multiple choice question option */
        .on("keydown", ".question_option_field", addMultipleChoiceOptionWhenPress)  /* This function will add option when using enter or tab key */
        .on("mousedown", ".grip_icon", enableDraggableQuestion)                     /* This function will enable sorting of questions */
        .on("mouseup", ".grip_icon", disableDraggableQuestion)                      /* This function will disable sorting of questions */
        .on("click", ".preview_btn", openPreviewModal)                              /* This function will open preview modal */
        .on("click", ".preview_close_btn", closePreviewModal)                       /* This function will close preview modal */
        .on("click", ".next_btn", previewNextButton)                                /* This function will navigate the preview template */
        .on("click", ".prev_btn", previewPrevButton)                                /* This function will navigate the preview template */
        .on("change", ".radio_option", enableNextButton)
        .on("keydown", ".question_answer_text", enableNextButton)
        .on("click", ".preview_next_btn", previewNextButton)
    
    $(".template_question_type").selectpicker();                                    /* Initialization of selectpicker */
    $('[data-toggle="tooltip"]').tooltip();                                         /* Initialization of tooltip */
    $(".carousel").carousel({ interval: false });                                   /* remove auto slide of carousel */
    $(".carousel").on("slid.bs.carousel", function() {
        console.log('click')
    });
});

/** 
    * DOCU: This function will navigate the preview template <br>
    * Triggered By: .on("click", ".add_question_btn", addQuestion) <br>
    * Last Updated Date: Sept. 2, 2022
    * @function
    * @author Alfie Osayan
*/
function previewNextButton(event){
    let next_btn = $(this);
    // let preview_content_header = $(".preview_modal_content").closest(".preview_content_header");
    let template_questions_length = $(".carousel-item").length - 1;

    if(carousel_index !== template_questions_length || carousel_index > 0) {
        $(".carousel").carousel("next");
        carousel_index++;
        
        let progress_value = (carousel_index / template_questions_length) * 100;
        
        $(".prev_btn")[0].removeAttribute("disabled");
        $(".progress_bar_container").removeClass("hidden");
        $(".progress_bar").css("width", `${progress_value}%`);
    }
    if(carousel_index === template_questions_length) {
        $(".next_btn")[0].setAttribute("disabled", "disabled");
    }
}

/** 
    * DOCU: This function will navigate the preview template <br>
    * Triggered By: .on("click", ".add_question_btn", addQuestion) <br>
    * Last Updated Date: Sept. 2, 2022
    * @function
    * @author Alfie Osayan
*/
function previewPrevButton(){
    let prev_btn = $(this);
    let template_questions_length = $(".carousel-item").length - 1;

    if(carousel_index > 0){
        $(".carousel").carousel("prev");
        carousel_index--;
        
        let progress_value = (carousel_index / template_questions_length) * 100;

        $(".next_btn")[0].removeAttribute("disabled");
        $(".progress_bar").css("width", `${progress_value}%`);
    }
    if(carousel_index === 0){
        prev_btn[0].setAttribute("disabled", "disabled");
        $(".progress_bar_container").addClass("hidden");
    }
}

/** 
    * DOCU: This function will add a question to the template <br>
    * Triggered By: .on("click", ".add_question_btn", addQuestion) <br>
    * Last Updated Date: Aug 19, 2022
    * @function
    * @author Alfie Osayan
*/
function addQuestion(){
    /** 
    question_id                 = ($(".template_question").length-1) + 1;
    let cloned_question         = $(".default_question").clone();
    let template_body_offset = $("#create_template_body").get(0).scrollHeight
    
    cloned_question.find(".bootstrap-select").replaceWith(function () { return $("select", this) });
    cloned_question.find(".template_question_type").selectpicker("render");
    cloned_question.find('[data-toggle="tooltip"]').tooltip();
    cloned_question.attr("class", "template_question").attr("id", `question_id_${question_id}`).insertAfter(".template_question:last");
    
    scrollToTargetOffset(template_body_offset);
    */

    $("#add_question_form").submit();
};

/** 
    * DOCU: This function will change the breadcrumb template title when the user change the template title <br>
    * Triggered By: .on("change", "#template_title", changeTemplateTitle) <br> 
    * Last Updated Date: Aug 09, 2022
    * @function
    * @author Alfie Osayan
*/
function changeTemplateTitle(){
    let template_header_title   = $(".template_header_title");
    let template_title          = $("#template_title").val();

    template_title === "" ? template_header_title.text("Untitled Template") : template_header_title.text(template_title);
};

/** 
    * DOCU: This function will set options for selected question type <br>
    * Triggered By: .on("change", "#template_question_type", setQuestionOptions) <br> 
    * Last Updated Date: Aug 09, 2022
    * @function
    * @author Alfie Osayan
*/
function setQuestionType(event, clickedIndex, isSelected, previousValue){
    let closest_template_question = $(this).closest(".template_question");
    let question_options = ["multiple_choice", "short_answer", "paragraph"]
    let selected_question_option = $(event.target).val();
    let tooltip = closest_template_question.find('[data-toggle="tooltip"]');
    let tooltip_text = "";
    
    if (selected_question_option === "0") {
        tooltip_text = "Have your candidates choose an answer from a list of options";
    }
    else if (selected_question_option === "1") {
        tooltip_text = "Candidates can answer with a word or a phrase.";
    }
    else {
        tooltip_text = "Candidates can answer in a sentence or a paragraph.";
    }

    tooltip.attr("data-original-title", tooltip_text);
    closest_template_question.find(`.${question_options[previousValue]}`).addClass("hidden");
    closest_template_question.find(`.${question_options[selected_question_option]}`).removeClass("hidden");
};

/** 
    * DOCU: This function will duplicate the selected question <br>
    * Triggered By: .on("click", ".duplicate_btn_icon", duplicateQuestion) <br> 
    * Last Updated Date: Aug 10, 2022
    * @function
    * @author Alfie Osayan
*/
function duplicateQuestion(){
    let this_question   = $(this).closest(".template_question");
    let question_id     = this_question.attr("id").split("id_")[1];

    // let duplicate_question = this_question.clone().attr("id", `question_id_${question_id}`).insertAfter(this_question);
    // let duplicate_question_position = duplicate_question.offset().top;
    // duplicate_question.find('[data-toggle="tooltip"]').tooltip();
    
    // scrollToTargetOffset(duplicate_question_position);
    $("#duplicate_question_form").find("#duplicate_question_id").val(question_id).submit();
}

/** 
    * DOCU: This function will open delete modal <br>
    * Triggered By: .on("click", ".delete_btn_icon", openDeleteModal) <br> 
    * Last Updated Date: Aug 12, 2022
    * @function
    * @author Alfie Osayan
*/
function openDeleteModal(){
    let this_question = $(this).closest(".template_question");
    let question_id = this_question.attr("id").split("id_")[1];
    
    $('#delete_question_modal').modal({
        backdrop: "static",
        keyboard: false
    });
    
    $("#delete_modal_question_id").val(question_id);
}

/** 
    * DOCU: This function will open preview modal <br>
    * Triggered By: .on("click", ".preview_btn", openPreviewModal) <br> 
    * Last Updated Date: Aug 22, 2022
    * @function
    * @author Alfie Osayan
*/
function openPreviewModal() {
    let template_title = $("#create_template_body").find("#template_title").val();
    let template_description = $("#create_template_body").find("#template_description").val();
    
    $("#template_preview_form").find("#form_template_title").val(template_title);
    $("#template_preview_form").find("#form_template_description").val(template_description);

    $("#create_template_form").submit();

    carousel_index = 0;

    $('#template_preview_modal').modal({
        backdrop: "static",
        keyboard: false
    });
}

/** 
    * DOCU: This function will close preview modal <br>
    * Triggered By: .on("click", ".preview_close_btn", closePreviewModal) <br> 
    * Last Updated Date: Aug 22, 2022
    * @function
    * @author Alfie Osayan
*/
function closePreviewModal(){
    $("#template_preview_modal").modal("hide");
}


/** 
    * DOCU: This function will delete the selected question <br>
    * Triggered By: .on("click", ".delete_modal_delete_btn", deleteQuestion) <br> 
    * Last Updated Date: Aug 10, 2022
    * @function
    * @author Alfie Osayan
*/
function deleteQuestion(){
    // $(`#${question_id}`).remove();
    $("#delete_question_modal").modal("hide");
}

/** 
    * DOCU: This function add option using 'add option button' <br>
    * Triggered By: .on("click", ".add_question_option", addMultipleChoiceOption) <br> 
    * Last Updated Date: Aug 23, 2022
    * @function
    * @author Alfie Osayan
*/
function addMultipleChoiceOption(){
    let this_question_option_item = $(this).closest(".question_option_action");
    let this_question_option = $(this).closest(".question_option");
    let default_question_option = $(".default_question").find(".question_option_item");
    let template_question = $(this).closest(".template_question");

    let question_id = template_question.find(".question_id").val();
    let question_option_clone = default_question_option.clone();
    let option_field_name = question_option_clone.find(".question_option_field").attr("name");

    option_field_name = option_field_name.replace("*", question_id);
    question_option_clone.find(".question_option_field").attr("name", option_field_name);
    question_option_clone.removeClass("hidden").insertBefore(this_question_option_item);
    this_question_option.find(".question_option_item:last").find(".question_option_field").focus();
}

/** 
    * DOCU: This function will add option when using enter or tab key <br>
    * Triggered By: .on("keydown", ".question_option_field", addMultipleChoiceOptionWhenPress) <br> 
    * Last Updated Date: Aug 23, 2022
    * @function
    * @author Alfie Osayan
*/
function addMultipleChoiceOptionWhenPress(event) {
    if (event.which === 13 || event.which === 9) {
        event.preventDefault();
        let this_question_option_item = $(this).closest(".question_option_item");
        let this_question_option = $(this).closest(".question_option");
        let default_question_option = $(".default_question").find(".question_option_item");
        let template_question = $(this).closest(".template_question");

        let question_id = template_question.find(".question_id").val();
        let question_option_clone = default_question_option.clone();
        let option_field_name = question_option_clone.find(".question_option_field").attr("name");

        option_field_name = option_field_name.replace("*", question_id);
        question_option_clone.find(".question_option_field").attr("name", option_field_name);
        question_option_clone.removeClass("hidden").insertAfter(this_question_option_item);
        this_question_option.find(".question_option_item:last").find(".question_option_field").focus();
    }
}

/** 
    * DOCU: This function will delete selected multiple choice question option <br>
    * Triggered By: .on("click", ".question_option_delete_btn", deleteQuestionOption) <br> 
    * Last Updated Date: Aug 10, 2022
    * @function
    * @author Alfie Osayan
*/
function deleteQuestionOption(){
    $(this).closest(".question_option_item").remove();
}

/** 
    * DOCU: This function will auto scroll to the target position <br>
    * Last Updated Date: Aug 12, 2022
    * @function
    * @author Alfie Osayan
*/
function scrollToTargetOffset(target_offset){
    $("#create_template_body").animate({
        scrollTop: target_offset
    }, 1000);
}

/** 
    * DOCU: This function will enable sorting of questions <br>
    * Triggered By: .on("mousedown", ".grip_icon", enableDraggableQuestion) <br> 
    * Last Updated Date: Aug 12, 2022
    * @function
    * @author Alfie Osayan
*/
function enableDraggableQuestion(){
    $(".template_questions").sortable({
        disabled: false,
        placeholder: "sortable_placeholder",
        helper: "clone",
        revert: "invalid",
    });
}

/** 
    * DOCU: This function will disable the sorting of questions <br>
    * Triggered By: .on("mouseup", ".grip_icon", disableDraggableQuestion) <br> 
    * Last Updated Date: Aug 12, 2022
    * @function
    * @author Alfie Osayan
*/
function disableDraggableQuestion() {
    $(".template_questions").sortable({ disabled: true });
}

/** 
    * DOCU: This function will enable next button in preview template <br>
    * Triggered By: .on("change", ".radio_option", enableNextButton) <br> 
    * Last Updated Date: Sept 1, 2022
    * @function
    * @author Alfie Osayan
*/
function enableNextButton(){
    let question_option = $(this);
    let preview_question_type_container = question_option.closest(".preview_question_type_container");
    let preview_next_btn = preview_question_type_container.find(".preview_next_btn");
    
    preview_next_btn[0].setAttribute("disabled", "disabled");
    
    if(question_option[0].checked || question_option[0].value !== ""){
        preview_next_btn[0].removeAttribute("disabled");
    }
}
