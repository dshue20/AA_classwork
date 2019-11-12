require 'rails-helper'

describe User do
    subject(:user) { User.new(email: "a@a.com", password: "1234567")}
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password).is_greater_than(6) }

    describe "#is_password?" do
        it "checks whether a given password is equal to the BCrypt version of the password_digest" do
            expect(user.is_password?("1234567")).to be(true)
            expect(user.is_password?("asfasdfk;l")).to be(false)
        end
    end

    describe "#reset_session_token" do
        it "resets the session token" do 
            old_token = user.session_token
            user.reset_session_token
            expect(user.session_token).to_not eq(old_token)
        end
    end

    describe "::find_by_credentials" do
        it "finds a user by email and password" do
            expect(User.find_by_credentials("a@a.com","1234567")).to eq(user)
            expect(User.find_by_credentials("b@b.com","adsfklajdf")).to eq(nil)
        end
    end
end