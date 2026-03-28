export interface Candidate {
  name: string;
  amountCents: number;
}

export interface Race {
  type: "senate" | "governor" | "house";
  label: string;
  democrat: Candidate;
  republican: Candidate;
}

export interface StateData {
  abbr: string;
  name: string;
  races: Race[];
}

// Helper: amounts in cents
const m = (millions: number) => Math.round(millions * 100 * 100_000);

const STATES: StateData[] = [
  {
    abbr: "AL", name: "Alabama",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Will Boyd", amountCents: m(4.2) }, republican: { name: "Tommy Tuberville", amountCents: m(12.1) } },
      { type: "governor", label: "Governor", democrat: { name: "Pamela Hunter", amountCents: m(2.1) }, republican: { name: "Kay Ivey", amountCents: m(8.4) } },
      { type: "house", label: "House District 2", democrat: { name: "Phyllis Harvey-Hall", amountCents: m(0.8) }, republican: { name: "Barry Moore", amountCents: m(2.3) } },
    ],
  },
  {
    abbr: "AK", name: "Alaska",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Jessica Cook", amountCents: m(3.1) }, republican: { name: "Lisa Murkowski", amountCents: m(7.8) } },
      { type: "governor", label: "Governor", democrat: { name: "Les Gara", amountCents: m(1.4) }, republican: { name: "Mike Dunleavy", amountCents: m(4.2) } },
      { type: "house", label: "House At-Large", democrat: { name: "Mary Peltola", amountCents: m(3.9) }, republican: { name: "Nick Begich", amountCents: m(2.8) } },
    ],
  },
  {
    abbr: "AZ", name: "Arizona",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Katie Hobbs", amountCents: m(9.1) }, republican: { name: "Karrin Taylor Robson", amountCents: m(11.3) } },
      { type: "house", label: "House District 1", democrat: { name: "Tom O'Halleran", amountCents: m(2.1) }, republican: { name: "David Schweikert", amountCents: m(3.4) } },
      { type: "house", label: "House District 6", democrat: { name: "Greg Stanton", amountCents: m(3.8) }, republican: { name: "Juan Ciscomani", amountCents: m(2.9) } },
    ],
  },
  {
    abbr: "AR", name: "Arkansas",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Joshua Price", amountCents: m(1.8) }, republican: { name: "John Boozman", amountCents: m(6.4) } },
      { type: "house", label: "House District 2", democrat: { name: "Natalie James", amountCents: m(0.9) }, republican: { name: "French Hill", amountCents: m(3.1) } },
    ],
  },
  {
    abbr: "CA", name: "California",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Gavin Newsom", amountCents: m(38.4) }, republican: { name: "Brian Dahle", amountCents: m(4.2) } },
      { type: "house", label: "House District 13", democrat: { name: "Adam Gray", amountCents: m(4.1) }, republican: { name: "John Duarte", amountCents: m(3.8) } },
      { type: "house", label: "House District 27", democrat: { name: "Christy Smith", amountCents: m(3.2) }, republican: { name: "Mike Garcia", amountCents: m(4.7) } },
      { type: "house", label: "House District 41", democrat: { name: "Will Rollins", amountCents: m(3.5) }, republican: { name: "Ken Calvert", amountCents: m(4.1) } },
    ],
  },
  {
    abbr: "CO", name: "Colorado",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Michael Bennet", amountCents: m(14.2) }, republican: { name: "Joe O'Dea", amountCents: m(9.8) } },
      { type: "house", label: "House District 3", democrat: { name: "Adam Frisch", amountCents: m(6.7) }, republican: { name: "Jeff Hurd", amountCents: m(4.2) } },
      { type: "house", label: "House District 8", democrat: { name: "Yadira Caraveo", amountCents: m(5.1) }, republican: { name: "Gabe Evans", amountCents: m(4.8) } },
    ],
  },
  {
    abbr: "CT", name: "Connecticut",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Ned Lamont", amountCents: m(7.3) }, republican: { name: "George Logan", amountCents: m(3.1) } },
      { type: "house", label: "House District 5", democrat: { name: "Jahana Hayes", amountCents: m(3.4) }, republican: { name: "George Logan", amountCents: m(3.1) } },
    ],
  },
  {
    abbr: "DE", name: "Delaware",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Lisa Blunt Rochester", amountCents: m(5.2) }, republican: { name: "Eric Hansen", amountCents: m(2.1) } },
      { type: "house", label: "House At-Large", democrat: { name: "Sarah McBride", amountCents: m(4.3) }, republican: { name: "John Whalen", amountCents: m(1.8) } },
    ],
  },
  {
    abbr: "FL", name: "Florida",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Nikki Fried", amountCents: m(11.4) }, republican: { name: "Ron DeSantis", amountCents: m(42.1) } },
      { type: "house", label: "House District 13", democrat: { name: "Eric Lynn", amountCents: m(3.8) }, republican: { name: "Anna Paulina Luna", amountCents: m(4.2) } },
      { type: "house", label: "House District 27", democrat: { name: "Annette Taddeo", amountCents: m(2.9) }, republican: { name: "Maria Elvira Salazar", amountCents: m(4.1) } },
    ],
  },
  {
    abbr: "GA", name: "Georgia",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Jon Ossoff", amountCents: m(21.3) }, republican: { name: "Brian Kemp", amountCents: m(18.7) } },
      { type: "house", label: "House District 6", democrat: { name: "Lucy McBath", amountCents: m(4.8) }, republican: { name: "Rich McCormick", amountCents: m(3.9) } },
      { type: "house", label: "House District 7", democrat: { name: "Caroline Bordeaux", amountCents: m(3.1) }, republican: { name: "Rich McCormick", amountCents: m(2.8) } },
    ],
  },
  {
    abbr: "HI", name: "Hawaii",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Josh Green", amountCents: m(4.1) }, republican: { name: "Duke Aiona", amountCents: m(1.2) } },
      { type: "house", label: "House District 1", democrat: { name: "Ed Case", amountCents: m(2.3) }, republican: { name: "Carmen Hulu Lindsey", amountCents: m(0.9) } },
    ],
  },
  {
    abbr: "ID", name: "Idaho",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "David Roth", amountCents: m(1.4) }, republican: { name: "Mike Crapo", amountCents: m(4.8) } },
      { type: "house", label: "House District 1", democrat: { name: "Kaylee Peterson", amountCents: m(0.6) }, republican: { name: "Russ Fulcher", amountCents: m(2.1) } },
    ],
  },
  {
    abbr: "IL", name: "Illinois",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Tammy Duckworth", amountCents: m(16.8) }, republican: { name: "Mark Kirk Jr.", amountCents: m(8.3) } },
      { type: "house", label: "House District 6", democrat: { name: "Sean Casten", amountCents: m(4.2) }, republican: { name: "Keith Pekau", amountCents: m(2.8) } },
      { type: "house", label: "House District 13", democrat: { name: "Nikki Budzinski", amountCents: m(3.4) }, republican: { name: "Regan Deering", amountCents: m(2.9) } },
      { type: "house", label: "House District 17", democrat: { name: "Eric Sorensen", amountCents: m(3.1) }, republican: { name: "Joe McGraw", amountCents: m(2.7) } },
    ],
  },
  {
    abbr: "IN", name: "Indiana",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Jennifer McCormick", amountCents: m(3.8) }, republican: { name: "Mike Braun", amountCents: m(9.2) } },
      { type: "house", label: "House District 1", democrat: { name: "Frank Mrvan", amountCents: m(2.1) }, republican: { name: "Randall Niemeyer", amountCents: m(1.4) } },
    ],
  },
  {
    abbr: "IA", name: "Iowa",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Lanon Baccam", amountCents: m(4.1) }, republican: { name: "Chuck Grassley", amountCents: m(8.9) } },
      { type: "house", label: "House District 1", democrat: { name: "Christina Bohannan", amountCents: m(3.6) }, republican: { name: "Mariannette Miller-Meeks", amountCents: m(3.2) } },
      { type: "house", label: "House District 3", democrat: { name: "Lanon Baccam", amountCents: m(2.8) }, republican: { name: "Zach Nunn", amountCents: m(3.1) } },
    ],
  },
  {
    abbr: "KS", name: "Kansas",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Dennis McKinney", amountCents: m(2.3) }, republican: { name: "Jerry Moran", amountCents: m(5.8) } },
      { type: "house", label: "House District 3", democrat: { name: "Sharice Davids", amountCents: m(4.9) }, republican: { name: "Amanda Adkins", amountCents: m(3.4) } },
    ],
  },
  {
    abbr: "KY", name: "Kentucky",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Lucas Monaghan", amountCents: m(2.8) }, republican: { name: "Rand Paul", amountCents: m(9.4) } },
      { type: "house", label: "House District 6", democrat: { name: "Greg Landsman", amountCents: m(3.1) }, republican: { name: "Andy Barr", amountCents: m(3.8) } },
    ],
  },
  {
    abbr: "LA", name: "Louisiana",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Gary Chambers", amountCents: m(3.4) }, republican: { name: "Bill Cassidy", amountCents: m(7.2) } },
      { type: "house", label: "House District 6", democrat: { name: "Quentin Anderson", amountCents: m(1.2) }, republican: { name: "Garret Graves", amountCents: m(3.8) } },
    ],
  },
  {
    abbr: "ME", name: "Maine",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Erin Herbig", amountCents: m(6.8) }, republican: { name: "Susan Collins", amountCents: m(12.4) } },
      { type: "house", label: "House District 2", democrat: { name: "Jared Golden", amountCents: m(4.7) }, republican: { name: "Austin Theriault", amountCents: m(3.9) } },
    ],
  },
  {
    abbr: "MD", name: "Maryland",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Wes Moore", amountCents: m(8.4) }, republican: { name: "Dan Cox", amountCents: m(2.1) } },
      { type: "house", label: "House District 6", democrat: { name: "David Trone", amountCents: m(5.1) }, republican: { name: "Neil Parrott", amountCents: m(2.3) } },
    ],
  },
  {
    abbr: "MA", name: "Massachusetts",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Elizabeth Warren", amountCents: m(22.3) }, republican: { name: "John Deaton", amountCents: m(7.8) } },
      { type: "house", label: "House District 9", democrat: { name: "Bill Keating", amountCents: m(2.1) }, republican: { name: "Helen Brady", amountCents: m(1.3) } },
    ],
  },
  {
    abbr: "MI", name: "Michigan",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Elissa Slotkin", amountCents: m(18.4) }, republican: { name: "Mike Rogers", amountCents: m(16.2) } },
      { type: "house", label: "House District 7", democrat: { name: "Curtis Hertel Jr.", amountCents: m(4.3) }, republican: { name: "Tom Barrett", amountCents: m(3.8) } },
      { type: "house", label: "House District 8", democrat: { name: "Kristen McDonald Rivet", amountCents: m(3.9) }, republican: { name: "Paul Junge", amountCents: m(3.2) } },
      { type: "house", label: "House District 10", democrat: { name: "Carl Marlinga", amountCents: m(3.1) }, republican: { name: "John James", amountCents: m(4.9) } },
    ],
  },
  {
    abbr: "MN", name: "Minnesota",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Tina Smith", amountCents: m(11.2) }, republican: { name: "Royce White", amountCents: m(4.1) } },
      { type: "house", label: "House District 2", democrat: { name: "Angie Craig", amountCents: m(4.8) }, republican: { name: "Tyler Kistner", amountCents: m(3.6) } },
    ],
  },
  {
    abbr: "MS", name: "Mississippi",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Ty Pinkins", amountCents: m(1.9) }, republican: { name: "Roger Wicker", amountCents: m(6.3) } },
      { type: "house", label: "House District 4", democrat: { name: "Bennie Thompson", amountCents: m(2.1) }, republican: { name: "Clay Mansell", amountCents: m(1.4) } },
    ],
  },
  {
    abbr: "MO", name: "Missouri",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Crystal Quade", amountCents: m(4.2) }, republican: { name: "Mike Kehoe", amountCents: m(9.8) } },
      { type: "house", label: "House District 2", democrat: { name: "Jill Schupp", amountCents: m(2.8) }, republican: { name: "Ann Wagner", amountCents: m(4.1) } },
    ],
  },
  {
    abbr: "MT", name: "Montana",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Jon Tester", amountCents: m(16.7) }, republican: { name: "Tim Sheehy", amountCents: m(13.4) } },
      { type: "house", label: "House District 2", democrat: { name: "Monica Tranel", amountCents: m(3.1) }, republican: { name: "Troy Downing", amountCents: m(2.8) } },
    ],
  },
  {
    abbr: "NE", name: "Nebraska",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Dan Osborn", amountCents: m(4.9) }, republican: { name: "Pete Ricketts", amountCents: m(8.1) } },
      { type: "house", label: "House District 2", democrat: { name: "Carol Blood", amountCents: m(2.3) }, republican: { name: "Don Bacon", amountCents: m(3.4) } },
    ],
  },
  {
    abbr: "NV", name: "Nevada",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Steve Sisolak", amountCents: m(8.3) }, republican: { name: "Joe Lombardo", amountCents: m(11.2) } },
      { type: "house", label: "House District 3", democrat: { name: "Susie Lee", amountCents: m(3.8) }, republican: { name: "Drew Johnson", amountCents: m(2.9) } },
      { type: "house", label: "House District 4", democrat: { name: "Steven Horsford", amountCents: m(3.4) }, republican: { name: "John Lee", amountCents: m(2.4) } },
    ],
  },
  {
    abbr: "NH", name: "New Hampshire",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Maggie Hassan", amountCents: m(13.8) }, republican: { name: "Don Bolduc", amountCents: m(6.2) } },
      { type: "house", label: "House District 1", democrat: { name: "Chris Pappas", amountCents: m(3.7) }, republican: { name: "Russell Prescott", amountCents: m(2.9) } },
    ],
  },
  {
    abbr: "NJ", name: "New Jersey",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Andy Kim", amountCents: m(11.4) }, republican: { name: "Curtis Bashaw", amountCents: m(8.7) } },
      { type: "house", label: "House District 7", democrat: { name: "Tom Malinowski", amountCents: m(4.2) }, republican: { name: "Tom Kean Jr.", amountCents: m(4.8) } },
    ],
  },
  {
    abbr: "NM", name: "New Mexico",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Martin Heinrich", amountCents: m(7.4) }, republican: { name: "Nella Domenici", amountCents: m(4.1) } },
      { type: "house", label: "House District 2", democrat: { name: "Gabe Vasquez", amountCents: m(3.6) }, republican: { name: "Yvette Herrell", amountCents: m(3.2) } },
    ],
  },
  {
    abbr: "NY", name: "New York",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Kathy Hochul", amountCents: m(16.8) }, republican: { name: "Lee Zeldin", amountCents: m(12.4) } },
      { type: "house", label: "House District 3", democrat: { name: "Tom Suozzi", amountCents: m(4.8) }, republican: { name: "George Santos", amountCents: m(1.2) } },
      { type: "house", label: "House District 18", democrat: { name: "Pat Ryan", amountCents: m(4.1) }, republican: { name: "Colin Schmitt", amountCents: m(3.7) } },
      { type: "house", label: "House District 22", democrat: { name: "Francis Conole", amountCents: m(3.4) }, republican: { name: "Brandon Williams", amountCents: m(3.9) } },
    ],
  },
  {
    abbr: "NC", name: "North Carolina",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Jeff Jackson", amountCents: m(12.3) }, republican: { name: "Ted Budd", amountCents: m(14.8) } },
      { type: "house", label: "House District 13", democrat: { name: "Jeff Jackson", amountCents: m(4.8) }, republican: { name: "Jeff Mills", amountCents: m(3.2) } },
      { type: "house", label: "House District 14", democrat: { name: "Tim Dunn", amountCents: m(2.9) }, republican: { name: "Tim Moore", amountCents: m(4.1) } },
    ],
  },
  {
    abbr: "ND", name: "North Dakota",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Merrill Piepkorn", amountCents: m(1.2) }, republican: { name: "Kelly Armstrong", amountCents: m(4.8) } },
      { type: "house", label: "House At-Large", democrat: { name: "Trygve Hammer", amountCents: m(0.8) }, republican: { name: "Rick Berg", amountCents: m(2.9) } },
    ],
  },
  {
    abbr: "OH", name: "Ohio",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Nan Whaley", amountCents: m(7.4) }, republican: { name: "Mike DeWine", amountCents: m(13.8) } },
      { type: "house", label: "House District 1", democrat: { name: "Greg Landsman", amountCents: m(4.1) }, republican: { name: "Steve Chabot", amountCents: m(3.7) } },
      { type: "house", label: "House District 9", democrat: { name: "Marcy Kaptur", amountCents: m(3.8) }, republican: { name: "J.R. Majewski", amountCents: m(1.9) } },
      { type: "house", label: "House District 13", democrat: { name: "Emilia Sykes", amountCents: m(3.5) }, republican: { name: "Madison Gesiotto Gilbert", amountCents: m(3.1) } },
    ],
  },
  {
    abbr: "OK", name: "Oklahoma",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Abby Broyles", amountCents: m(2.4) }, republican: { name: "Markwayne Mullin", amountCents: m(7.8) } },
      { type: "house", label: "House District 5", democrat: { name: "Tom Guild", amountCents: m(1.8) }, republican: { name: "Stephanie Bice", amountCents: m(3.4) } },
    ],
  },
  {
    abbr: "OR", name: "Oregon",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Ron Wyden", amountCents: m(9.8) }, republican: { name: "Darin Harbick", amountCents: m(3.1) } },
      { type: "house", label: "House District 5", democrat: { name: "Janelle Bynum", amountCents: m(4.3) }, republican: { name: "Lori Chavez-DeRemer", amountCents: m(4.8) } },
      { type: "house", label: "House District 6", democrat: { name: "Andrea Salinas", amountCents: m(3.7) }, republican: { name: "Mike Erickson", amountCents: m(3.1) } },
    ],
  },
  {
    abbr: "PA", name: "Pennsylvania",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Josh Shapiro", amountCents: m(19.4) }, republican: { name: "Doug Mastriano", amountCents: m(7.1) } },
      { type: "house", label: "House District 7", democrat: { name: "Susan Wild", amountCents: m(4.6) }, republican: { name: "Lisa Scheller", amountCents: m(3.9) } },
      { type: "house", label: "House District 8", democrat: { name: "Matt Cartwright", amountCents: m(4.1) }, republican: { name: "Jim Bognet", amountCents: m(3.4) } },
      { type: "house", label: "House District 17", democrat: { name: "Chris Deluzio", amountCents: m(3.8) }, republican: { name: "Jeremy Shaffer", amountCents: m(2.7) } },
    ],
  },
  {
    abbr: "RI", name: "Rhode Island",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Sheldon Whitehouse", amountCents: m(6.2) }, republican: { name: "Allen Waters", amountCents: m(1.8) } },
      { type: "house", label: "House District 2", democrat: { name: "Seth Magaziner", amountCents: m(2.9) }, republican: { name: "Allan Fung", amountCents: m(2.1) } },
    ],
  },
  {
    abbr: "SC", name: "South Carolina",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Jaime Harrison", amountCents: m(7.3) }, republican: { name: "Tim Scott", amountCents: m(16.8) } },
      { type: "house", label: "House District 1", democrat: { name: "Michael Moore", amountCents: m(2.4) }, republican: { name: "Nancy Mace", amountCents: m(5.1) } },
    ],
  },
  {
    abbr: "SD", name: "South Dakota",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Brian Bengs", amountCents: m(1.4) }, republican: { name: "John Thune", amountCents: m(8.2) } },
      { type: "governor", label: "Governor", democrat: { name: "Jamie Smith", amountCents: m(2.1) }, republican: { name: "Kristi Noem", amountCents: m(9.4) } },
      { type: "house", label: "House At-Large", democrat: { name: "Lori Stacey", amountCents: m(0.9) }, republican: { name: "Dusty Johnson", amountCents: m(3.1) } },
    ],
  },
  {
    abbr: "TN", name: "Tennessee",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Gloria Johnson", amountCents: m(4.8) }, republican: { name: "Marsha Blackburn", amountCents: m(11.2) } },
      { type: "house", label: "House District 5", democrat: { name: "Heidi Campbell", amountCents: m(2.3) }, republican: { name: "Andy Ogles", amountCents: m(3.1) } },
    ],
  },
  {
    abbr: "TX", name: "Texas",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Colin Allred", amountCents: m(19.8) }, republican: { name: "Ted Cruz", amountCents: m(43.2) } },
      { type: "house", label: "House District 15", democrat: { name: "Michelle Vallejo", amountCents: m(3.2) }, republican: { name: "Monica De La Cruz", amountCents: m(4.1) } },
      { type: "house", label: "House District 28", democrat: { name: "Henry Cuellar", amountCents: m(3.8) }, republican: { name: "Sandra Whitten", amountCents: m(2.4) } },
      { type: "house", label: "House District 34", democrat: { name: "Vicente Gonzalez", amountCents: m(4.2) }, republican: { name: "Mayra Flores", amountCents: m(3.7) } },
    ],
  },
  {
    abbr: "UT", name: "Utah",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Brian King", amountCents: m(3.1) }, republican: { name: "Spencer Cox", amountCents: m(7.4) } },
      { type: "house", label: "House District 2", democrat: { name: "Kael Weston", amountCents: m(2.4) }, republican: { name: "Celeste Maloy", amountCents: m(3.2) } },
    ],
  },
  {
    abbr: "VT", name: "Vermont",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Becca Balint", amountCents: m(3.4) }, republican: { name: "Phil Scott", amountCents: m(4.8) } },
      { type: "house", label: "House At-Large", democrat: { name: "Becca Balint", amountCents: m(3.1) }, republican: { name: "Ericka Redic", amountCents: m(1.4) } },
    ],
  },
  {
    abbr: "VA", name: "Virginia",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Tim Kaine", amountCents: m(12.4) }, republican: { name: "Hung Cao", amountCents: m(6.8) } },
      { type: "house", label: "House District 2", democrat: { name: "Elaine Luria", amountCents: m(4.2) }, republican: { name: "Jen Kiggans", amountCents: m(4.8) } },
      { type: "house", label: "House District 7", democrat: { name: "Abigail Spanberger", amountCents: m(5.4) }, republican: { name: "Yesli Vega", amountCents: m(3.8) } },
    ],
  },
  {
    abbr: "WA", name: "Washington",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Maria Cantwell", amountCents: m(11.8) }, republican: { name: "Raul Garcia", amountCents: m(4.2) } },
      { type: "house", label: "House District 3", democrat: { name: "Marie Perez", amountCents: m(4.1) }, republican: { name: "Joe Kent", amountCents: m(3.8) } },
      { type: "house", label: "House District 8", democrat: { name: "Kim Schrier", amountCents: m(5.3) }, republican: { name: "Matt Larkin", amountCents: m(4.1) } },
    ],
  },
  {
    abbr: "WV", name: "West Virginia",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Steve Williams", amountCents: m(2.8) }, republican: { name: "Patrick Morrisey", amountCents: m(6.4) } },
      { type: "house", label: "House District 2", democrat: { name: "Steve Wendelin", amountCents: m(0.8) }, republican: { name: "Alex Mooney", amountCents: m(3.2) } },
    ],
  },
  {
    abbr: "WI", name: "Wisconsin",
    races: [
      { type: "governor", label: "Governor", democrat: { name: "Tony Evers", amountCents: m(14.2) }, republican: { name: "Tim Michels", amountCents: m(12.8) } },
      { type: "house", label: "House District 1", democrat: { name: "Ann Roe", amountCents: m(2.9) }, republican: { name: "Bryan Steil", amountCents: m(3.4) } },
      { type: "house", label: "House District 3", democrat: { name: "Rebecca Cooke", amountCents: m(3.1) }, republican: { name: "Derrick Van Orden", amountCents: m(3.8) } },
    ],
  },
  {
    abbr: "WY", name: "Wyoming",
    races: [
      { type: "senate", label: "U.S. Senate", democrat: { name: "Reid Rasner", amountCents: m(0.9) }, republican: { name: "John Barrasso", amountCents: m(5.1) } },
      { type: "house", label: "House At-Large", democrat: { name: "Dicky Shanor", amountCents: m(0.7) }, republican: { name: "Harriet Hageman", amountCents: m(3.8) } },
    ],
  },
];

// Build lookup maps
export const STATE_BY_ABBR = new Map<string, StateData>(
  STATES.map((s) => [s.abbr, s])
);

// FIPS code → state abbreviation
export const FIPS_TO_ABBR: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "12": "FL", "13": "GA",
  "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA",
  "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD",
  "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO",
  "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ",
  "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
  "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC",
  "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT",
  "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY",
};

/** Generate a URL slug for a race: e.g. "tx-senate", "oh-house-13", "az-governor" */
export function getRaceSlug(stateAbbr: string, race: Race): string {
  const base = `${stateAbbr.toLowerCase()}-${race.type}`;
  if (race.type === "house") {
    const district = race.label.match(/\d+/)?.[0];
    return district ? `${base}-${district}` : `${base}-al`;
  }
  return base;
}

/** Find a race by its slug */
export function findRaceBySlug(slug: string): { state: StateData; race: Race } | null {
  const parts = slug.split("-");
  if (parts.length < 2) return null;
  const stateAbbr = parts[0].toUpperCase();
  const state = STATE_BY_ABBR.get(stateAbbr);
  if (!state) return null;

  const raceType = parts[1] as Race["type"];
  const district = parts[2]; // may be undefined for non-house

  const race = state.races.find((r) => {
    if (r.type !== raceType) return false;
    if (raceType === "house" && district) {
      if (district === "al") return r.label.toLowerCase().includes("at-large");
      return r.label.includes(district);
    }
    return true;
  });

  return race ? { state, race } : null;
}

/** Primary race shown on hover: senate > governor > first house */
export function getPrimaryRace(state: StateData): Race {
  return (
    state.races.find((r) => r.type === "senate") ??
    state.races.find((r) => r.type === "governor") ??
    state.races[0]
  );
}

/**
 * Determine fill color for the state.
 * - Default (no hover active): vibrant blue/red
 * - Hovered state: most vibrant
 * - Other states while something is hovered: washed out
 * - Selected: vibrant even when not the active hover
 */
export function getStateFill(
  state: StateData,
  isHovered: boolean,
  isSelected: boolean,
  isAnyHovered: boolean
): string {
  const race = getPrimaryRace(state);
  const dLeads = race.democrat.amountCents > race.republican.amountCents;

  if (isHovered)  return dLeads ? "#1d4ed8" : "#b91c1c"; // blue-700 / red-700 — spotlight
  if (isSelected) return dLeads ? "#3b82f6" : "#ef4444"; // blue-500 / red-500 — stays vibrant
  if (isAnyHovered) return dLeads ? "#bfdbfe" : "#fecaca"; // blue-100 / red-100 — muted
  return dLeads ? "#3b82f6" : "#ef4444"; // blue-500 / red-500 — vibrant default
}
