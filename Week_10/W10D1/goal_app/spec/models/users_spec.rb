require 'rails_helper'

RSpec.describe User, type: :model do
    
    it { should validate_presence_of(:email)}
    it { should validate_presence_of(:password_digest)}
    it { should validate_length_of(:password).is_at_least(6)}
    it { should validate_presence_of(:session_token)}

    describe "uniqueness" do 
        before(:each) do 
          create(:user)
        end 
        it { should validate_uniqueness_of(:email) }
    end

    # describe "#password=" do
        
    # end 

    describe "#is_password?" do 
        let(:user) {create(:user)}
        before(:each) { user.password = "hunter2" }

        context 'with valid password' do 
          it 'should return true' do
            expect(user.is_password?('hunter2')).to be(true)
          end
        end 

        context 'with invalid password' do
            it 'should return false' do
                expect(user.is_password?('not_hunter2')).to be(false)
            end
        end
    end
     
    describe "::find_by_credentials" do
        let!(:user) { User.create(email: "a@a.com", password: "hunter2")}
          
        context "when it finds a valid user" do
            it "returns a User instance" do
                expect(User.find_by_credentials("a@a.com", "hunter2")).to eq(user)
            end
        end
        context "when the email and password do no match an existing user" do
            it "returns nil" do 
                expect(User.find_by_credentials("slkdfjlsdjf", "sdfkjslkdfj")).to be(nil)
            end
        end
    end

    describe "::generate_session_token" do
        let!(:user) {create(:user)}
        it "generates a session token" do
            expect(User.generate_session_token).to_not be(nil)
        end
    end

    # describe "#ensure_session_token" do
    #     context "when there is an existing session token" do
    #         it "generates a new session token" do

    #         end
    #     end
    #     context "when there is no existing session token" do
    #         it "does not change the session token" do

    #         end
    #     end
    # end
    
    describe "#reset_session_token" do
        let!(:user) {create(:user)}
        it "resets the user's session token" do
            user.session_token = User.generate_session_token
            old_token = user.session_token
            expect(user.reset_session_token).to_not eq(old_token)
        end
    end
end