Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post "/process_create_template"       => "templates#process_create_template"
  post "/process_delete_question"       => "templates#process_delete_question"
  post "/process_add_question"          => "templates#process_add_question"
  post "/process_duplicate_question"    => "templates#process_duplicate_question"
  post "/process_template_preview"    => "templates#process_template_preview"

  root "templates#index"
end
