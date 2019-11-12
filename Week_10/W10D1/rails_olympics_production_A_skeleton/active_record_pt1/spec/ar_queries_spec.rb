require 'rspec'
require 'rails_helper'
require 'spec_helper'

require_relative '../problems/ar_queries.rb'

describe 'to_lead_or_not_to_lead' do
  subject { to_lead_or_not_to_lead.as_json }

  it 'retrieves the correct information' do
    expected_result = [
		{ id: 4685, ord: 3}
	].map{ |el| el.stringify_keys }

    expect(subject).to contain_exactly(*expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'highest_score' do
  subject { highest_score.as_json }

  it 'retrieves the correct information' do
    expected_result = [
		{ id: 2, title: "Shawshank Redemption, The"},
		{ id: 12, title: "Godfather, The"},
		{ id: 241, title: "Shichinin no samurai"},
		{ id: 331, title: "Wo hu zang long"}
	].map{ |el| el.stringify_keys }

    expect(subject).to contain_exactly(*expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'star_wars_movies' do
  subject { star_wars_movies.as_json }

  it 'retrieves the correct information' do
    expected_result = [
		{ id: 1, title: "Star Wars", yr: 1977 },
		{ id: 5, title: "Star Wars: Episode V - The Empire Strikes Back", yr: 1980 },
		{ id: 13, title: "Star Wars: Episode VI - Return of the Jedi", yr: 1983 },
		{ id: 17, title: "Star Wars: Episode I - The Phantom Menace", yr: 1999 }
	].map{ |el| el.stringify_keys }

    expect(subject).to contain_exactly(*expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end


describe 'wesley_movies' do
  subject { wesley_movies.as_json }

  it 'retrieves the correct information' do
    expected_result = [
		{ id: 369, title: "Demolition Man", score: 6.1 },
		{ id: 497, title: "U.S. Marshals", score: 6.2 },
		{ id: 213, title: "Blade", score: 6.7 },
		{ id: 1654, title: "Drop Zone", score: 5.5 },
		{ id: 1585, title: "New Jack City", score: 6.1 },
		{ id: 1243, title: "Money Train", score: 5.1 },
		{ id: 1191, title: "Passenger 57", score: 5.4 },
		{ id: 1277, title: "Murder at 1600", score: 6.0 },
		{ id: 1294, title: "To Wong Foo, Thanks for Everything, Julie Newmar", score: 5.5 },
		{ id: 880, title: "Rising Sun", score: 6.0 },
		{ id: 1054, title: "Fan, The", score: 5.4 },
		{ id: 751, title: "White Men Can't Jump", score: 6.2 }
	].map{ |el| el.stringify_keys }

    expect(subject).to contain_exactly(*expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'michelle_movies' do
  subject { michelle_movies.as_json }

  it 'retrieves the correct information' do
    expected_result = [ 
		{ id: 281, title: "Dangerous Liaisons", yr: 1988 },
		{ id: 350, title: "Scarface", yr: 1983 },
		{ id: 506, title: "Prince of Egypt, The", yr: 1998 },
		{ id: 856, title: "Age of Innocence, The", yr: 1993 },
		{ id: 429, title: "What Lies Beneath", yr: 2000 },
		{ id: 1012, title: "Fabulous Baker Boys, The", yr: 1989 },
		{ id: 1284, title: "Frankie and Johnny", yr: 1991 },
		{ id: 1035, title: "Midsummer Night's Dream, A", yr: 1999 },
		{ id: 493, title: "Witches of Eastwick, The", yr: 1987 },
		{ id: 748, title: "One Fine Day", yr: 1996 },
		{ id: 205, title: "Batman Returns", yr: 1992 },
		{ id: 1546, title: "Deep End of the Ocean, The", yr: 1999 },
		{ id: 1644, title: "Russia House, The", yr: 1990 },
		{ id: 802, title: "Wolf", yr: 1994 },
		{ id: 1239, title: "Up Close & Personal", yr: 1996 },
		{ id: 970, title: "Tequila Sunrise", yr: 1988 },
		{ id: 894, title: "Dangerous Minds", yr: 1995 },
		{ id: 1115, title: "Story of Us, The", yr: 1999 },
		{ id: 1845, title: "Hollywood Knights, The", yr: 1980 },
		{ id: 1275, title: "Amazon Women on the Moon", yr: 1987 },
		{ id: 1024, title: "Grease 2", yr: 1982 }
	].map{ |el| el.stringify_keys }

    expect(subject).to eq(expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'actor_ids_from_grease' do
	subject { actor_ids_from_grease }

	it 'retrieves the correct information' do
		expect(subject).to contain_exactly(
		34, 317, 1413, 1764, 2956, 3434, 3832, 4136
    )
	end

  it 'hits the database exactly once' do
    expect{ subject.as_json }.to make_database_queries(count: 1)
  end
end

describe 'susan_supporting_roles' do
  subject { susan_supporting_roles.as_json }

  it 'retrieves the correct information' do
    expected_result =  [
		{ id: 575, title: "Bull Durham" },
		{ id: 493, title: "Witches of Eastwick, The" },
		{ id: 193, title: "Rocky Horror Picture Show, The" },
		{ id: 1528, title: "Twilight" },
		{ id: 1608, title: "Hunger, The" },
		{ id: 1788, title: "Atlantic City" },
		{ id: 1377, title: "Cradle Will Rock" },
		{ id: 756, title: "Stepmom" }
    ].map{ |el| el.stringify_keys }

    expect(subject).to contain_exactly(*expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end


describe 'best_years' do
  subject { best_years }

  it 'retrieves the correct information' do
	expected_result = [1943,
					   1935,
					   1934,
					   1933,
					   1930,
					   1922,
					   1936,
					   1939,
					   1938,
					   1925,
					   1929,
					   1927,
					   1952]

    expect(subject).to contain_exactly(*expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'smallest_cast' do
  subject { smallest_cast.as_json }

  it 'retrieves the correct information' do
    expected_result = [
		{ id: 905, title: "Wallace & Gromit: A Grand Day Out" },
		{ id: 165, title: "Wallace & Gromit: The Wrong Trousers" },
		{ id: 383, title: "Wallace & Gromit: A Close Shave" }
    ].map{ |el| el.stringify_keys }

    expect(subject).to contain_exactly(*expected_result)
  end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end



describe 'not_too_good' do
	subject { not_too_good.as_json }
	it 'retrieves the correct information' do
		expected_result = [
			{ id: 1407, title: "Nothing But Trouble" },
			{ id: 1797, title: "Friday the 13th Part 3: 3D" },
			{ id: 1521, title: "Dracula: Dead and Loving It" },
			{ id: 1413, title: "Hanging Up" },
			{ id: 1301, title: "Book of Shadows: Blair Witch 2" }
		].map{ |el| el.stringify_keys }

		expect(subject).to contain_exactly(*expected_result)
	end

  it 'hits the database exactly once' do
    expect{ subject }.to make_database_queries(count: 1)
  end
end