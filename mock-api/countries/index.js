const countries = [
  {
    Country: '[Kingdom of] eSwatini',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Afghanistan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Africa',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Albania',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Algeria',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Andorra',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Angola',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Antigua and Barbuda',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Argentina',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Armenia',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Aruba',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Asia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Australia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Austria',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Azerbaijan',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Bahamas',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Bahrain',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Bangladesh',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Barbados',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Belarus',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Belgium',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Belize',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Benin',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Bermuda',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Bhutan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Bolivia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Bosnia-Herzegovina',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Botswana',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Brazil',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'British Virgin Islands',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Brunei',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Bulgaria',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Burkina Faso',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Burundi',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Cabo Verde',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Cambodia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Cameroon',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Canada',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Cayman Islands',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Central African Republic',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Central America',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Chad',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Chile',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'China',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Colombia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Comoros',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Congo (Brazzaville)',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Congo (Democratic Rep.)',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Costa Rica',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: "Cote d'Ivoire",
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Croatia',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Cuba',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Cyprus',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Czech Republic',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Denmark',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Djibouti',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Dominica',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Dominican Republic',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Ecuador',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Egypt',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'El Salvador',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Equatorial Guinea',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Eritrea',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Estonia',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Ethiopia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Falkland Islands',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Faroe Islands',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Fiji',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Finland',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'France',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'French Guiana',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'French Polynesia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Gabon',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Gambia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Georgia',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Germany',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Ghana',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Gibraltar',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Greece',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Greenland',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Grenada',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Guadeloupe',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Guatemala',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Guernsey',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Guinea',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Guinea-Bissau',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Guyana',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Haiti',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Honduras',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Hong Kong',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Hungary',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Iceland',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'India',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Indonesia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Iran',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Iraq',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Ireland',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Isle of Man',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Israel',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Italy',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Jamaica',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Japan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Jersey',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Jordan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Kazakhstan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Kenya',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Kiribati',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Kosovo',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Kuwait',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Kyrgyzstan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Laos',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Latvia',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Lebanon',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Lesotho',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Liberia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Libya',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Liechtenstein',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Lithuania',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Luxembourg',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Madagascar',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Malawi',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Malaysia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Maldives',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Mali',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Malta',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Marshall Islands',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Martinique',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Mauritania',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Mauritius',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Mayotte',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Mexico',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Micronesia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Moldova',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Monaco',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Mongolia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Montenegro',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Morocco',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Mozambique',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Myanmar',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Namibia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Nauru',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Nepal',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Netherlands',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'New Caledonia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'New Zealand',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Nicaragua',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Niger',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Nigeria',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'North America',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'North Korea',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Norway',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Oceania',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Oman',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Pakistan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Palau',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Palestine',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Panama',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Papua New Guinea',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Paraguay',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Peru',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Philippines',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Poland',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Portugal',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Puerto Rico',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Qatar',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Republic of North Macedonia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Reunion',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Romania',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Russia',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Rwanda',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Saint Barthelemy',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Saint Kitts and Nevis',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Saint Lucia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Saint Martin',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Saint Vincent and the Grenadines',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Samoa',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Sao Tome and Principe',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Saudi Arabia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Senegal',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Serbia',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Seychelles',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Sierra Leone',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Singapore',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Slovakia',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Slovenia',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Solomon Islands',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Somalia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'South Africa',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'South America',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'South Korea',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'South Sudan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Spain',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Sri Lanka',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Sudan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Suriname',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Sweden',
    Not_Europe: 'Europe',
    EU: 'EU27',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Switzerland',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Syria',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Taiwan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Tajikistan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Tanzania',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Thailand',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Timor-Leste',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Togo',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Tonga',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Trinidad and Tobago',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Tunisia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Turkey',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Turkmenistan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Turks and Caicos',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Tuvalu',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Uganda',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Ukraine',
    Not_Europe: 'Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Europe_Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'United Arab Emirates',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'United States',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Uruguay',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Uzbekistan',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Vanuatu',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Venezuela',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Americas'
  },
  {
    Country: 'Vietnam',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Wallis et Futuna',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Yemen',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Zambia',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: 'Zimbabwe',
    Not_Europe: 'Not_Europe',
    EU: 'Not_EU',
    Not_EUSL: 'Not_EUSL',
    Americas: 'Not_Americas'
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: '',
    Not_Europe: '',
    EU: '',
    Not_EUSL: '',
    Americas: ''
  },
  {
    Country: ''
  }
]

module.exports = { countries }
