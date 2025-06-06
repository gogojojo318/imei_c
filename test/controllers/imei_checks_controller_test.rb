require "test_helper"

class ImeiChecksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get imei_checks_index_url
    assert_response :success
  end

  test "should get create" do
    get imei_checks_create_url
    assert_response :success
  end
end
