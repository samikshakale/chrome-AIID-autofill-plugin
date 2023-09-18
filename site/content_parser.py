import requests
from bs4 import BeautifulSoup
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from transformers import pipeline


def getTextContent(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    text = ""
    for data in soup.find_all("p"):
        text = text + " " + data.get_text()
    return text

def getSummary(text):
    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    tokenized_text = tokenizer(text, return_tensors="pt")
    input_tensor = tokenized_text['input_ids'][0:1, 0:1024]

    outputs = model.generate(input_tensor)

    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return summary

def getDetails(summary):
    qa_model_name = "deepset/roberta-base-squad2"
    qa = pipeline('question-answering', model=qa_model_name, tokenizer=qa_model_name)
    QA_input1 = {
    'question': "Who employed or was responsible for this technology?",
    'context': summary
    }
    res1 = qa(QA_input1)
    deployer = res1['answer']

    QA_input2 = {
        'question': "Who built or created the technology?",
        'context': summary
    }
    res2 = qa(QA_input2)
    developer = res2['answer']

    QA_input3 = {
        'question': "Who experienced negative impacts?",
        'context': summary
    }
    res3 = qa(QA_input3)
    harmed = res3['answer']
    return (deployer, developer, harmed)