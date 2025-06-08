require 'rails_helper'

RSpec.describe ImeiChecksController, type: :controller do
  describe 'POST #create' do
    it '正常にレスポンスが返る' do
      post :create, params: { imei: '123456789012345' }
      expect(response).to have_http_status(:success)
      expect(assigns(:result)).to be_present
    end
  end
end

