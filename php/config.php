<?php
declare(strict_types=1);

// Civicapi SDK configuration

class CivicapiConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Civicapi",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://civicapi.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "election" => [],
                    "polling" => [],
                    "result" => [],
                ],
            ],
            "entity" => [
        'election' => [
          'fields' => [
            [
              'name' => 'date',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'state',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'type',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'election',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'CA',
                        'kind' => 'query',
                        'name' => 'state',
                        'orig' => 'state',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 2024,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/elections',
                  'parts' => [
                    'api',
                    'elections',
                  ],
                  'select' => [
                    'exist' => [
                      'state',
                      'type',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'polling' => [
          'fields' => [
            [
              'name' => 'end_date',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'margin_of_error',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'poll_id',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'pollster',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'result',
              'req' => false,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'sample_size',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'start_date',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 6,
            ],
          ],
          'name' => 'polling',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2024-presidential',
                        'kind' => 'query',
                        'name' => 'election_id',
                        'orig' => 'election_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2024-12-31',
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2024-01-01',
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'CA',
                        'kind' => 'query',
                        'name' => 'state',
                        'orig' => 'state',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/polling',
                  'parts' => [
                    'api',
                    'polling',
                  ],
                  'select' => [
                    'exist' => [
                      'election_id',
                      'end_date',
                      'start_date',
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'result' => [
          'fields' => [
            [
              'name' => 'candidate',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'party',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'percentage',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'vote',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 3,
            ],
          ],
          'name' => 'result',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'Los Angeles',
                        'kind' => 'query',
                        'name' => 'county',
                        'orig' => 'county',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2024-presidential',
                        'kind' => 'query',
                        'name' => 'election_id',
                        'orig' => 'election_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'CA',
                        'kind' => 'query',
                        'name' => 'state',
                        'orig' => 'state',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/results',
                  'parts' => [
                    'api',
                    'results',
                  ],
                  'select' => [
                    'exist' => [
                      'county',
                      'election_id',
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CivicapiFeatures::make_feature($name);
    }
}
