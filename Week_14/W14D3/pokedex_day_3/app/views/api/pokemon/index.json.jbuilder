@pokemon.each do |pokemon|
    json.set! pokemon.id do
        #debugger;
        json.extract! pokemon, :id, :name
        json.image_url image_url(pokemon.image_url)
        json.item_ids []
    end
end