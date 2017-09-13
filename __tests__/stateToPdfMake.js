import StateToPdfMake from '../src/stateToPdfMake';
import { contentStateData } from '../resources/contentStateData';
import { pdfMakeData } from '../resources/pdfMakeData';

function match(contentStateData, pdfMakeData) {
  const stateToPdfMake = new StateToPdfMake(contentStateData);
  const response = stateToPdfMake.generate();

  expect(response).toMatchObject(pdfMakeData);
}

describe('StateToPdfMake', () => {
  test('Render all content state correctly', () => {
    match(contentStateData, pdfMakeData);
  });

  test('Render header one correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "a531g",
          "text": "Quem num gosta di mim que vai caçá sua turmis! ",
          "type": "header-one",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": "Quem num gosta di mim que vai caçá sua turmis! ",
        "fontSize": 24,
        "bold": true,
        "margin": [0,5,0,0]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Render header two correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "a531g",
          "text": "Quem num gosta di mim que vai caçá sua turmis! ",
          "type": "header-two",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": "Quem num gosta di mim que vai caçá sua turmis! ",
        "fontSize": 22,
        "bold": true,
        "margin": [0,5,0,0]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Render header three correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "a531g",
          "text": "Quem num gosta di mim que vai caçá sua turmis! ",
          "type": "header-three",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": "Quem num gosta di mim que vai caçá sua turmis! ",
        "fontSize": 20,
        "bold": true,
        "margin": [0,5,0,0]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Render header four correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "a531g",
          "text": "Quem num gosta di mim que vai caçá sua turmis! ",
          "type": "header-four",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": "Quem num gosta di mim que vai caçá sua turmis! ",
        "fontSize": 18,
        "bold": true,
        "margin": [0,5,0,0]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Render header five correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "a531g",
          "text": "Quem num gosta di mim que vai caçá sua turmis! ",
          "type": "header-five",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": "Quem num gosta di mim que vai caçá sua turmis! ",
        "fontSize": 16,
        "bold": true,
        "margin": [0,5,0,0]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Render header six correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "a531g",
          "text": "Quem num gosta di mim que vai caçá sua turmis! ",
          "type": "header-six",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": "Quem num gosta di mim que vai caçá sua turmis! ",
        "fontSize": 14,
        "bold": true,
        "margin": [0,5,0,0]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Has bold attribute', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "b5n0b",
          "text": "Mussum Ipsum, cacilds vidis litro abertis. ",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [ { "offset": 0, "length": 42, "style": "BOLD" } ],
          "entityRanges": [],
          "data": {}
        }
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": [{
          "text": "Mussum Ipsum, cacilds vidis litro abertis.",
          "bold": true,
          "italics": false, "decoration": []
        }]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Has italic attribute', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "b5n0b",
          "text": "Mussum Ipsum, cacilds vidis litro abertis. ",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [ { "offset": 0, "length": 42, "style": "ITALIC" } ],
          "entityRanges": [],
          "data": {}
        }
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": [{
          "text": "Mussum Ipsum, cacilds vidis litro abertis.",
          "bold": false,
          "italics": true, "decoration": [] }
        ]}
      ]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Has underline decoration', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "b5n0b",
          "text": "Mussum Ipsum, cacilds vidis litro abertis. ",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [ { "offset": 0, "length": 42, "style": "UNDERLINE" } ],
          "entityRanges": [],
          "data": {}
        }
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": [{
          "text": "Mussum Ipsum, cacilds vidis litro abertis.",
          "bold": false,
          "italics": false, "decoration": ['underline']
        }]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Has line through decoration', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "b5n0b",
          "text": "Mussum Ipsum, cacilds vidis litro abertis. ",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [ { "offset": 0, "length": 42, "style": "STRIKETHROUGH" } ],
          "entityRanges": [],
          "data": {}
        }
      ]
    };

    const pdfMakeData = {
      "content": [{
        "text": [{
          "text": "Mussum Ipsum, cacilds vidis litro abertis.",
          "bold": false,
          "italics": false, "decoration": ['lineThrough']
        }]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Render ul list correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "aqbh6",
          "text": "Detraxit consequat et quo num tendi nada.Vehicula non. ",
          "type": "unordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "2j5lb",
          "text": "Ut sed ex eros. ",
          "type": "unordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ]
    };

    const pdfMakeData = {
      "content": [{
        "ul" : [
          {
            "text": [
              {
                "text": "Detraxit consequat et quo num tendi nada.Vehicula non. ",
                "bold": false,
                "italics": false,
                "decoration": []
              }
            ]
          },
          {
            "text": [
              {
                "text": "Ut sed ex eros. ",
                "bold": false,
                "italics": false,
                "decoration": []
              }
            ]
          }
        ]
      }]
    };

    match(contentStateData, pdfMakeData);
  });

  test('Render ol list correctly', () => {
    const contentStateData = {
      "entityMap": {}, "blocks": [
        {
          "key": "aqbh6",
          "text": "Detraxit consequat et quo num tendi nada.Vehicula non. ",
          "type": "ordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "2j5lb",
          "text": "Ut sed ex eros. ",
          "type": "ordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ]
    };

    const pdfMakeData = {
      "content": [{
        "ol" : [
          {
            "text": [
              {
                "text": "Detraxit consequat et quo num tendi nada.Vehicula non. ",
                "bold": false,
                "italics": false,
                "decoration": []
              }
            ]
          },
          {
            "text": [
              {
                "text": "Ut sed ex eros. ",
                "bold": false,
                "italics": false,
                "decoration": []
              }
            ]
          }
        ]
      }]
    };

    match(contentStateData, pdfMakeData);
  });
});
