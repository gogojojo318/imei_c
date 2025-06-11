require 'rails_helper'

RSpec.describe "IMEIチェック機能", type: :request do
  describe "POST /imei_checks" do

    context "正しいIMEI（15桁の数字）を入力した場合" do
      let(:valid_imei) { "123456789012345" }

      it "indexテンプレートが表示され、判定結果がセットされる" do
        post imei_checks_path, params: { imei: valid_imei }
        expect(response).to render_template(:index)
        expect(assigns(:results)).to be_present
        expect(flash[:alert]).to be_nil
      end
    end

    context "IMEIが短い（15桁未満）の場合" do
      let(:short_imei) { "12345" }

      it "indexにリダイレクトされ、エラーメッセージが表示される" do
        post imei_checks_path, params: { imei: short_imei }
        expect(response).to redirect_to(imei_checks_path)
        follow_redirect!
        expect(response.body).to include("IMEIは15桁の数字で入力してください")
        expect(flash[:alert]).to eq("IMEIは15桁の数字で入力してください")
      end
    end

    context "IMEIに数字以外の文字が含まれている場合" do
      let(:invalid_imei) { "12345abcde67890" }

      it "indexにリダイレクトされ、エラーメッセージが表示される" do
        post imei_checks_path, params: { imei: invalid_imei }
        expect(response).to redirect_to(imei_checks_path)
        follow_redirect!
        expect(response.body).to include("IMEIは15桁の数字で入力してください")
        expect(flash[:alert]).to eq("IMEIは15桁の数字で入力してください")
      end
    end

  end
end


