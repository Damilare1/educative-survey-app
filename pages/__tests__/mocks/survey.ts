export const inputTypes = {
  data: [
    {
      id: 'types-123',
      label: 'Multiple Choice',
      icon: 'mdi-radiobox-marked'
    },
    {
      id: 'types-456',
      label: 'Check box',
      icon: 'mdi-checkbox-outline'
    }
  ]
}

export const survey = {
  data: {
    survey_name: 'Test 1',
    survey_description: 'Test survey 1',
    id: 'id-1',
    is_active: true,
    questions: [
      {
        id: 'qid-1',
        question: 'New Question',
        input_type_id: 'types-123',
        options: [
          {
            id: '4902eeb3-d81a-49ef-b0d8-a4fe01803be9',
            label: 'Option 1'
          },
          {
            id: 'bba05863-425e-44e3-886d-7bd11f1774ac',
            label: 'Option 2'
          },
          {
            id: 'cd31c8b9-70e0-4813-92ca-440daddbc4bd',
            label: 'Option 3'
          }
        ]
      },
      {
        id: 'qid-2',
        question: 'New Question 2',
        input_type_id: 'types-123',
        options: [
          {
            id: '95b16770-307d-4bfb-9983-975a86c53d8a',
            label: 'Option 1'
          },
          {
            id: '0c9d986e-0f3f-4ca9-a9f9-4a928c2fef22',
            label: 'Option 2'
          },
          {
            id: '3312e9a6-4540-491f-8df3-7324b00e4d7e',
            label: 'Option 3'
          }
        ]
      },
      {
        id: '8b8a2296-c310-4641-90fa-1ec1b0a7ee96',
        question: 'Untitled Question',
        input_type_id: 'types-456',
        options: [
          {
            id: '5b4066fd-dae1-4b1c-95b6-a1e28e956868',
            label: 'Option 1'
          }
        ]
      },
      {
        id: 'c0d3a46b-458d-47bf-b61a-a8d2bdcb6d38',
        question: 'Untitled Question',
        input_type_id: 'types-456',
        options: [
          {
            id: '0456e392-d2e8-4f2e-b749-efaa98f12014',
            label: 'Option 1'
          }
        ]
      }
    ]
  }
}

export const responses = {
  data: {
    data: [
      {
        question_id: 'a4ac1bec-387d-4baa-8ce5-6e17c2ee55f2',
        question: 'New Question',
        options: [
          {
            label: 'Option 1',
            count: '2'
          },
          {
            label: 'Option 2',
            count: '1'
          }
        ]
      },
      {
        question_id: '5f67bb4a-48b4-428f-af07-6538e12463ce',
        question: 'New Question 2',
        options: [
          {
            label: 'Option 1',
            count: '3'
          },
          {
            label: 'Option 2',
            count: '2'
          },
          {
            label: 'Option 3',
            count: '1'
          }
        ]
      },
      {
        question_id: '8b8a2296-c310-4641-90fa-1ec1b0a7ee96',
        question: 'Untitled Question',
        options: [
          {
            label: 'Option 1',
            count: '1'
          }
        ]
      },
      {
        question_id: 'c0d3a46b-458d-47bf-b61a-a8d2bdcb6d38',
        question: 'Untitled Question',
        options: [
          {
            label: 'Option 1',
            count: '1'
          }
        ]
      }
    ],
    count: 0,
    id: 'id-1',
    survey_name: 'Test 1',
    survey_description: 'Test survey 1',
    is_active: true,
    start_date: null,
    end_date: null,
    admin_id: 'adid-1',
    createdAt: '2023-08-25T08:40:15.687Z'
  }
}
