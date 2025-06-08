require 'rails_helper'

RSpec.describe "IMEI checks", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get imei_checks_path
      expect(response).to have_http_status(:success)
    end
  end  

  describe "POST /imei_checks" do
    it "returns http success" do
      post imei_checks_path, params: { imei: "123456789012345" }
      expect(response).to have_http_status(:success)
    end
  end
end