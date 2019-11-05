class ArtworksController < ApplicationController
  def index
    artworks = []
    if params[:user_id]
      artworks_to_add = Artwork.find_by(artist_id: params[:user_id])
      artworks_to_add.is_a?(Array)? artworks += artworks_to_add : artworks << artworks_to_add
    end
    artwork_shares = ArtworkShare.find_by(viewer_id: params[:user_id])
    artwork_shares.is_a?(Array)? artwork_shares.each {|as| artworks += as.artwork} : artworks << artwork_shares.artwork
    #debugger
    render json: artworks.uniq
  end

  def create
    artwork = Artwork.new(artwork_params)
    if artwork.save
      render json: artwork
    else
      render json: artwork.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    render json: Artwork.find_by_id(params[:id])
  end

  def update
    artwork = Artwork.find_by_id(params[:id])
    if artwork.update(artwork_params)
      render json: artwork
    else
      render json: artwork.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    artwork = Artwork.find_by_id(params[:id])
    artwork.destroy
    render plain: 'Destruction successful'
  end

  private

  def artwork_params
    params.require(:artwork).permit(:title, :image_url, :artist_id)
  end
end