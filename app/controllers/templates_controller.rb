require 'securerandom'

class TemplatesController < ApplicationController
    $questions = [
        {
            "question_id"   => "1",
            "question_title" => "Multiple Choice Question",
            "question_type" => "0",
            "question_options" => ["Option1", "Option2"]
        }, 
        {
            "question_id"   => "2",
            "question_title" => "Short Answer Question",
            "question_type" => "1",
            "question_options" => []
        },
        {
            "question_id"   => "3",
            "question_title" => "Paragraph Question",
            "question_type" => "2",
            "question_options" => []
        },
    ] 

    def index
        @questions = $questions
    end

    def process_create_template
        response = { :status => false, :redirect => false }
        # this params variable contains the POST data
        # puts params
        # to access an index in the POST data, use this format
        @post_questions = params[:question].to_a

        @partial_template_questions = []
        @post_questions.each do | question |
            @partial_template_questions.append(question[1])
        end

        $questions = @partial_template_questions

        # you may append this using javascript
        response[:status] = true
        response[:html] 	= render_to_string  :partial => "templates/partials/template_question_partial", :locals => { :questions => @partial_template_questions }
        render :json => response
    end

    def process_delete_question
        response = { :status => false, :redirect => false }

        $questions.each do | question |
            if question['question_id'] == params[:question_id]
                $questions.delete(question) 
            end
        end

        response[:status] = true
        response[:question_id] = params[:question_id]
        response[:html] 	= render_to_string  :partial => "templates/partials/template_question_partial", :locals => { :questions => $questions }
        render :json => response
    end

    def process_add_question
        response = { :status => false, :redirect => false }

        @question_id = SecureRandom.random_number(100000000)

        @new_question = {
            "question_id"   => @question_id,
            "question_title" => "",
            "question_type" => "0",
            "question_options" => []
        }

        $questions.append(@new_question)
        response[:status] = true
        response[:html] 	= render_to_string  :partial => "templates/partials/template_question_partial", :locals => { :questions => $questions }
        render :json => response
    end

    def process_duplicate_question
        response = { :status => false, :redirect => false }
        @question_id = params[:question_id]
        @new_question_id = SecureRandom.random_number(100000000)

        @question_to_be_duplicated = $questions.select { |question| question["question_id"] == @question_id }
        @question_index = $questions.map.each_with_index { |question, index| question["question_id"] == @question_id ? index : nil}.compact

        @duplicated_question = {
            "question_id" => @new_question_id,
            "question_title" => @question_to_be_duplicated[0]["question_title"],
            "question_type" => @question_to_be_duplicated[0]["question_type"],
            "question_options" => @question_to_be_duplicated[0]["question_options"]
        }

        $questions.append(@duplicated_question)
        response[:status]   = true
        response[:html] 	= render_to_string  :partial => "templates/partials/template_question_partial", :locals => { :questions => $questions }
        render :json => response
    end

    def process_template_preview
        response = { :status => false, :redirect => false }
        # this params variable contains the POST data
        # puts params
        # to access an index in the POST data, use this format
        @post_questions = params[:question].to_a

        @template = {
            "template_title" => params[:template_title],
            "template_description" => params[:template_description]
        }

        @partial_template_questions = []
        @post_questions.each do | question |
            @partial_template_questions.append(question[1])
        end

        # you may append this using javascript
        response[:status]   = true
        response[:html] 	= render_to_string  :partial => "templates/partials/template_preview_content_partial", :locals => { :template => @template, :questions => @partial_template_questions }
        render :json => response
    end
end
