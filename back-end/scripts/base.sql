DROP OWNED BY gestion_depense;

CREATE TABLE Familles (
                          id  SERIAL NOT NULL,
                          nom varchar(50) NOT NULL,
                          responsable varchar(50) NOT NULL,
                          PRIMARY KEY (id));
CREATE TABLE Roles (
                       id  SERIAL NOT NULL,
                       nom varchar(255) NOT NULL UNIQUE,
                       PRIMARY KEY (id));

CREATE TABLE Membres (
                         id             SERIAL NOT NULL,
                         famille_id     int4 NOT NULL,
                         role_id        int4 NOT NULL,
                         nom            varchar(255) NOT NULL,
                         prenom         varchar(255) NOT NULL,
                         date_naissance date NOT NULL,
                         sexe_id        int4 NOT NULL,
                         login          varchar(255) NOT NULL UNIQUE,
                         mdp            varchar(255) NOT NULL,
                         photo          text DEFAULT 'data:image/png;base64,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',
                         PRIMARY KEY (id));

CREATE TABLE TypeDepenses (
                              id  SERIAL NOT NULL,
                              nom varchar(255) NOT NULL UNIQUE,
                              PRIMARY KEY (id));
CREATE TABLE Depenses (
                          id             SERIAL NOT NULL,
                          famille_id     int4 NOT NULL,
                          membre_id      int4 NOT NULL,
                          typeDepense_id int4 NOT NULL,
                          montant        numeric(10, 2) NOT NULL,
                          libelle       varchar(50),
                          date_depense   timestamp NOT NULL,
                          PRIMARY KEY (id));

CREATE TABLE PartageDepenses (
                                 id           SERIAL NOT NULL,
                                 depense_id   int4 NOT NULL,
                                 membre_id    int4 NOT NULL,
                                 montant_part numeric(10, 2) NOT NULL,
                                 PRIMARY KEY (id));

CREATE TABLE BudgetDepenses (
                                id             SERIAL NOT NULL,
                                mois            date DEFAULT now(),
                                typeDepense_id int4 NOT NULL,
                                famille_id     int4 NOT NULL,
                                montant        numeric(10, 2) NOT NULL,
                                PRIMARY KEY (id));


CREATE TABLE Revenus (
                         id            SERIAL NOT NULL,
                         famille_id    int4 NOT NULL,
                         membre_id     int4 NOT NULL,
                         typeRevenu_id int4 NOT NULL,
                         montant       numeric(10, 2) NOT NULL,
                         libelle       varchar(50),
                         date_revenu   timestamp NOT NULL,
                         PRIMARY KEY (id));

CREATE TABLE TypeRevenus (
                             id  SERIAL NOT NULL,
                             nom varchar(255) NOT NULL,
                             PRIMARY KEY (id));

CREATE TABLE Sexes (
                       id  SERIAL NOT NULL,
                       nom varchar(255) NOT NULL,
                       PRIMARY KEY (id));


create table Tokens (
                        id serial primary key,
                        token varchar(40) not null unique,
                        membre_id int4 REFERENCES Membres(id) NOT NULL,
                        date_expiration date not null default current_date + interval '1 day',
                        statut boolean not null default true
);



ALTER TABLE Membres ADD CONSTRAINT FKMembres130795 FOREIGN KEY (famille_id) REFERENCES Familles (id);
ALTER TABLE Membres ADD CONSTRAINT FKMembres390450 FOREIGN KEY (role_id) REFERENCES Roles (id);
ALTER TABLE Depenses ADD CONSTRAINT FKDepenses971107 FOREIGN KEY (famille_id) REFERENCES Familles (id);
ALTER TABLE Depenses ADD CONSTRAINT FKDepenses131152 FOREIGN KEY (membre_id) REFERENCES Membres (id);
ALTER TABLE Depenses ADD CONSTRAINT FKDepenses365518 FOREIGN KEY (typeDepense_id) REFERENCES TypeDepenses (id);
ALTER TABLE PartageDepenses ADD CONSTRAINT FKPartageDep51661 FOREIGN KEY (depense_id) REFERENCES Depenses (id);
ALTER TABLE PartageDepenses ADD CONSTRAINT FKPartageDep786432 FOREIGN KEY (membre_id) REFERENCES Membres (id);
ALTER TABLE BudgetDepenses ADD CONSTRAINT FKBudgetDepe478689 FOREIGN KEY (typeDepense_id) REFERENCES TypeDepenses (id);
ALTER TABLE BudgetDepenses ADD CONSTRAINT FKBudgetDepe113654 FOREIGN KEY (famille_id) REFERENCES Familles (id);
ALTER TABLE Revenus ADD CONSTRAINT FKRevenus51152 FOREIGN KEY (membre_id) REFERENCES Membres (id);
ALTER TABLE Revenus ADD CONSTRAINT FKRevenus818178 FOREIGN KEY (famille_id) REFERENCES Familles (id);
ALTER TABLE Revenus ADD CONSTRAINT FKRevenus170572 FOREIGN KEY (typeRevenu_id) REFERENCES TypeRevenus (id);
ALTER TABLE Membres ADD CONSTRAINT FKMembres541728 FOREIGN KEY (sexe_id) REFERENCES Sexes (id);


SELECT * FROM Tokens WHERE membre_id = 1 AND date_expiration >= current_date;


/*Total Dépense par mois*/
CREATE OR REPLACE VIEW v_total_depense_par_mois
AS
WITH years AS (
    SELECT EXTRACT(YEAR FROM CURRENT_DATE)::integer AS year
),
     months AS (
         SELECT generate_series(1, 12) AS month
     )
SELECT
    f.id AS famille_id,
    years.year AS annee,
    months.month AS mois,
    COALESCE(SUM(d.montant), 0) AS total_depense
FROM
    years
        CROSS JOIN Familles f
        CROSS JOIN months
        LEFT JOIN Depenses d ON EXTRACT(YEAR FROM d.date_depense) = years.year AND EXTRACT(MONTH FROM d.date_depense) = months.month AND d.famille_id = f.id
GROUP BY
    f.id,
    years.year,
    months.month
ORDER BY
    f.id,
    years.year,
    months.month;


/*Total Revenu par mois*/
CREATE OR REPLACE VIEW v_total_revenu_par_mois AS
WITH years AS (
    SELECT EXTRACT(YEAR FROM CURRENT_DATE)::integer AS year
),
     months AS (
         SELECT generate_series(1, 12) AS month
     )
SELECT
    f.id AS famille_id,
    years.year AS annee,
    months.month AS mois,
    COALESCE(SUM(r.montant), 0) AS total_revenu
FROM
    years
        CROSS JOIN Familles f
        CROSS JOIN months
        LEFT JOIN Revenus r ON EXTRACT(YEAR FROM r.date_revenu) = years.year AND EXTRACT(MONTH FROM r.date_revenu) = months.month AND r.famille_id = f.id
GROUP BY
    f.id,
    years.year,
    months.month
ORDER BY
    f.id,
    years.year,
    months.month;




/*Total Dépense du mois en cours*/
CREATE OR REPLACE VIEW v_total_depense_du_mois
AS
SELECT * FROM v_total_depense_par_mois WHERE mois = EXTRACT(MONTH FROM NOW()) AND annee = EXTRACT(YEAR  FROM NOW());


/*Total Revenu du mois en cours*/
CREATE OR REPLACE VIEW v_total_revenu_du_mois
AS
SELECT * FROM v_total_revenu_par_mois WHERE mois = EXTRACT(MONTH FROM NOW()) AND annee = EXTRACT(YEAR  FROM NOW());


/*Somme dépense hatrizay par famille*/
CREATE OR REPLACE VIEW v_total_depense_par_famille
AS
SELECT famille_id, SUM(total_depense) AS somme_depense
FROM v_total_depense_par_mois
GROUP BY famille_id;

/*Somme revenu hatrizay par famille*/
CREATE OR REPLACE VIEW v_total_revenu_par_famille
AS
SELECT famille_id, SUM(total_revenu) AS somme_revenu
FROM v_total_revenu_par_mois
GROUP BY famille_id;

/*Total en caisse par famille*/
CREATE OR REPLACE VIEW v_total_en_caisse_par_famille
AS
SELECT d.famille_id, (r.somme_revenu - d.somme_depense) AS montant_caisse_total
FROM v_total_revenu_par_famille r
JOIN v_total_depense_par_famille d ON r.famille_id = d.famille_id;


/*Transcations - revenu depense*/
CREATE OR REPLACE VIEW v_transactions AS
SELECT d.famille_id, d.membre_id, M.nom,M.prenom, 'Dépense' AS type_transaction, td.nom AS type, d.montant, d.date_depense AS date_transaction
FROM Depenses d
            JOIN TypeDepenses td ON d.typeDepense_id = td.id
            JOIN Membres M on d.membre_id = M.id
UNION ALL
SELECT r.famille_id, r.membre_id, M.nom,M.prenom, 'Revenu' AS type_transaction, tr.nom AS type, r.montant, r.date_revenu AS date_transaction
FROM Revenus r
        JOIN TypeRevenus tr ON r.typeRevenu_id = tr.id
        JOIN Membres M on r.membre_id = M.id;



/*Budget par type depense par mois*/
CREATE OR REPLACE VIEW v_budget_par_categorie_par_mois
AS
SELECT td.id AS typedepense_id, td.nom AS typedepense, bd.famille_id, bd.mois,
       bd.montant AS montant_budget,
       COALESCE(SUM(d.montant), 0) AS somme_depenses,
       bd.montant - COALESCE(SUM(d.montant), 0) AS reste_budget
FROM BudgetDepenses bd
         LEFT JOIN Depenses d ON bd.typeDepense_id = d.typeDepense_id
    AND bd.famille_id = d.famille_id
         JOIN typedepenses td ON bd.typeDepense_id = td.id
WHERE DATE_TRUNC('month', bd.mois) = DATE_TRUNC('month', d.date_depense) OR d.date_depense IS NULL
GROUP BY td.id, td.nom, bd.famille_id, bd.mois, bd.montant;


/*
SELECT td.id AS typedepense_id, td.nom AS typedepense, bd.famille_id, bd.mois,
       bd.montant AS montant_budget,
       COALESCE(SUM(d.montant), 0) AS somme_depenses,
       bd.montant - COALESCE(SUM(d.montant), 0) AS reste_budget
FROM BudgetDepenses bd
         LEFT JOIN Depenses d ON bd.typeDepense_id = d.typeDepense_id
    AND bd.famille_id = d.famille_id
         JOIN typedepenses td ON d.typeDepense_id = td.id
WHERE DATE_TRUNC('month',bd.mois) = DATE_TRUNC('month', d.date_depense)
GROUP BY bd.famille_id, bd.mois, bd.montant, td.nom, td.id;*/

/*SELECT * from v_budget_par_categorie_par_mois WHERE typedepense_id = 8 AND EXTRACT('month' FROM mois) = EXTRACT('month' FROM now()) AND famille_id = 1;*/

/*SELECT td.id AS typedepense_id, td.nom AS typedepense, bd.famille_id, bd.mois,
       bd.montant AS montant_budget,
       COALESCE(SUM(d.montant), 0) AS somme_depenses,
       bd.montant - COALESCE(SUM(d.montant), 0) AS reste_budget
FROM BudgetDepenses bd
     LEFT JOIN Depenses d ON bd.typeDepense_id = d.typeDepense_id
    AND bd.famille_id = d.famille_id
    JOIN typedepenses td ON bd.typeDepense_id = td.id
WHERE DATE_TRUNC('month', bd.mois) = DATE_TRUNC('month', d.date_depense) OR d.date_depense IS NULL
GROUP BY td.id, td.nom, bd.famille_id, bd.mois, bd.montant;*/

CREATE OR REPLACE VIEW v_membre
AS
SELECT M.id, M.famille_id, M.nom, M.prenom, M.date_naissance, M.role_id, R.nom as role, S.nom as sexe, M.photo FROM Membres M
LEFT JOIN Roles R on M.role_id = R.id
LEFT JOIN Sexes S on M.sexe_id = S.id;

CREATE OR REPLACE VIEW v_revenu_global_par_membre
AS
WITH years AS (
    SELECT EXTRACT(YEAR FROM CURRENT_DATE)::integer AS year
),
     months AS (
         SELECT generate_series(1, 12) AS month
     )
SELECT
    M.id AS membre_id,
    f.id AS famille_id,
    years.year AS annee,
    months.month AS mois,
    COALESCE(SUM(r.montant), 0) AS total_revenu
FROM
    years
        CROSS JOIN Familles f
        CROSS JOIN Membres M
        CROSS JOIN months
        LEFT JOIN Revenus r ON EXTRACT(YEAR FROM r.date_revenu) = years.year AND EXTRACT(MONTH FROM r.date_revenu) = months.month AND r.famille_id = f.id AND r.membre_id = M.id
GROUP BY
    f.id,
    M.id,
    years.year,
    months.month
ORDER BY
    f.id,
    years.year,
    months.month;


CREATE OR REPLACE VIEW v_depense_global_par_membre
AS
WITH years AS (
    SELECT EXTRACT(YEAR FROM CURRENT_DATE)::integer AS year
),
     months AS (
         SELECT generate_series(1, 12) AS month
     )
SELECT
    M.id AS membre_id,
    f.id AS famille_id,
    years.year AS annee,
    months.month AS mois,
    COALESCE(SUM(d.montant), 0) AS total_depense
FROM
    years
        CROSS JOIN Familles f
        CROSS JOIN Membres M
        CROSS JOIN months
        LEFT JOIN Depenses d ON EXTRACT(YEAR FROM d.date_depense) = years.year AND EXTRACT(MONTH FROM d.date_depense) = months.month AND d.famille_id = f.id AND d.membre_id = M.id
GROUP BY
    f.id,
    M.id,
    years.year,
    months.month
ORDER BY
    f.id,
    years.year,
    months.month;


CREATE OR REPLACE VIEW v_profil_par_mois AS
SELECT
    rev.membre_id,
    M.nom,
    M.prenom,
    R.nom as role,
    S.nom as sexe,
    M.login,
    M.date_naissance,
    M.photo,
    rev.famille_id,
    rev.annee,
    rev.mois,
    rev.total_revenu,
    dep.total_depense
FROM
    v_revenu_global_par_membre rev
        LEFT JOIN
    v_depense_global_par_membre dep
    ON
    rev.membre_id = dep.membre_id
    AND rev.famille_id = dep.famille_id
    AND rev.annee = dep.annee
    AND rev.mois = dep.mois
    LEFT JOIN Membres M on rev.membre_id = M.id
    LEFT JOIN Sexes S on M.sexe_id = S.id
    LEFT JOIN Roles R on M.role_id = R.id
ORDER BY
    rev.membre_id,
    rev.famille_id,
    rev.annee,
    rev.mois;


SELECT * FROM v_profil_par_mois WHERE membre_id = 1 AND famille_id = 1 AND mois = EXTRACT('MONTH' FROM NOW());
