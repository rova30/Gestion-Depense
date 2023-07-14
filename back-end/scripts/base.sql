DROP OWNED BY gestion_depense;

CREATE TABLE Familles (
                          id  SERIAL NOT NULL,
                          nom varchar(255) NOT NULL,
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



CREATE OR REPLACE VIEW v_transactions AS
SELECT d.famille_id, M.nom,M.prenom, 'Dépense' AS type_transaction, td.nom AS type, d.montant, d.date_depense AS date_transaction
FROM Depenses d
            JOIN TypeDepenses td ON d.typeDepense_id = td.id
            JOIN Membres M on d.membre_id = M.id
UNION ALL
SELECT r.famille_id, M.nom,M.prenom, 'Revenu' AS type_transaction, tr.nom AS type, r.montant, r.date_revenu AS date_transaction
FROM Revenus r
        JOIN TypeRevenus tr ON r.typeRevenu_id = tr.id
        JOIN Membres M on r.membre_id = M.id;


SELECT * FROM v_transactions WHERE famille_id = 2 ORDER BY date_transaction DESC
