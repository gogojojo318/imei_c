Rails.application.routes.draw do
  root "imei_checks#index"
  resources :imei_checks, only: [:index, :create]
end
