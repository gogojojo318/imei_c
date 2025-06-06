Rails.application.routes.draw do
  root "imei_checks#index"
  resouces :imei_checks, only: [:index, :create]
end
