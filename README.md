# RailMan App
<p>&nbsp;</p>
    <h2>
        Order Food in Trains Online
    </h2>
    <p>
        Gone are the days when you had to rely on pantry car food to pacify your hunger. Now, you can order food in trains online and choose among multiple food options while travelling.
        We work with full diligence to deliver fresh and delicious food to passengers at their seat.
        We offer a variety of cuisines to choose from including North Indian, Chinese, Italian, Jain food, Mughlai, South Indian, and Continental. Apart from these options, regional foods are also on the menu, so that you won’t miss your home delicacies while travelling.
    </p>

## Table of contents

<!-- toc -->
- [Pre requisites](#pre-requisites)
- [Getting started](#getting-started)
<!-- tocstop -->
## Pre requisites

Create backend DB

```bash
cd "railman\"
createdb -U postgres -h localhost -p 5432 railman
```

Restore data to railman DB

```bash
pg_restore -U postgres -h localhost -p 5432 -F c -v -d railman backend\railmanDb_backup.dump
```

## Getting started

### Install railman frontend

```bash
cd "frontend"
npm install
```

Start the Railman React frontend

```bash
npm start
```

### Intall railman backend

```bash
cd "backend"
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

Start the Railman Django backend

```bash
python manage.py runserver
```