Rails.application.routes.draw do
  root "imei_checks#index"
  resource :imei_checks, only: [:index, :create]
end
