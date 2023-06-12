export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getSurvey: () => ({
        id: 1,
        survey_name: 'Test Survey',
        survey_description:
          'This survey is a test.',
        is_active: 1,
        start_date: '2022-03-01',
        end_date: '2022-03-31',
        questions: [
          {
            id: 1,
            question: 'Is this real?',
            input_type: 'Multiple choice',
            options: [
              {
                id: 1,
                label: 'Yes'
              },
              {
                id: 2,
                label: 'No'
              }
            ]
          },
          {
            id: 2,
            survey_id: 1,
            question: 'How many questions are there?',
            input_type: 'Multiple choice',
            options: [
              {
                id: 6,
                label: '1'
              },
              {
                id: 7,
                label: '2'
              },
              {
                id: 8,
                label: '3'
              },
              {
                id: 9,
                label: '4'
              },
              {
                id: 10,
                label: '5'
              }
            ]
          }
        ]
      })
    }
  }
})
