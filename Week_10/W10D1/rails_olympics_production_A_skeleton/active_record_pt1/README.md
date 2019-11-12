# Rails Olympics Part 1 - ActiveRecord Querying

This section of the evaluation will be focused on assessing your knowledge on
writing queries utilizing ActiveRecord. This portion of the evaluation is
estimated to take **45 minutes**.

## File Structure

The files you will be tested on are noted below:

```plaintext
/active_record_pt1
├── README.md (<- you are here)
├── app
│   └── models
│        └── actor.rb
├── problems
│   └── ar_queries.rb
└── spec
    └── ar_queries_spec.rb
/build_rails_project_p2
```

## Scoring

There are two objectives for this section of the evaluation. The scoring is
shown below for each objective:

| Objective        | Maximum Points | Estimated Time (minutes) |
| ---------------- | -------------- | ------------------------ |
| N+1 Model Method | 6              | 10                       |
| AR Queries       | 20             | 35                       |

A full credit score for the N+1 Model Method portion of the evaluation is **6
points**. The ActiveRecord Queries portion of the evaluation is comprised of 20
specs with each spec being worth 1 point for a total of **20 points**.

## Objective

There are two objectives for this portion of the test:

1. Write an instance method for the Actor model
2. Pass the specs found in the `spec` directory

For the first objective see the `app/models/actor.rb` file.

For the second objective the problems will be found in the
`problems/ar_queries.rb` file. There are 20 total specs given in the `spec`
directory. Your second objective is to pass as many specs as possible.

## Setting up the Database

Once you've installed dependencies using `bundle install` run the setup script
by running:

```sh
./setup
```

This will run a script that will take care of populating your database!

## Running Specs

- `bundle exec rspec` to run the entire spec suite
- `bundle exec rspec spec/<spec_file_name>` to run all specs in a given spec
  file
  - for example: `bundle exec rspec spec/ar_queries_spec.rb`
- `bundle exec rspec spec/<spec_file_name>:<line_number>` to run the spec(s) in
  the block that contains the given line number of a given spec file
  - for example: `bundle exec rspec spec/ar_queries_spec.rb:101`
