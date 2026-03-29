"""Add cor_field_taxref

Revision ID: 3e545f17fee4
Revises: ca0ecf8667af
Create Date: 2026-03-21 14:24:57.060689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e545f17fee4'
down_revision = 'ca0ecf8667af'
branch_labels = None
depends_on = None


def upgrade():
    #op.add_column(
    #    "t_additional_fields",
    #    sa.Column("applicable_cd_nom", 
    #        sa.Integer,
    #        sa.ForeignKey("taxonomie.taxref.cd_nom"),
    #        nullable=True),
    #    schema="gn_commons",
    #)

    op.create_table(
        "cor_field_taxref",
        sa.Column(
            "id_field",
            sa.Integer(),
            sa.ForeignKey(
                f"gn_commons.t_additional_fields.id_field",
                name="fk_cor_field_taxref_id_field",
                ondelete="CASCADE",
                onupdate="CASCADE",
            ),
            nullable=False,
        ),
        sa.Column(
            "cd_nom",
            sa.Integer(),
            sa.ForeignKey(
                f"taxonomie.taxref.cd_nom",
                name="fk_cor_field_taxref_cd_nom",
                ondelete="CASCADE",
                onupdate="CASCADE",
            ),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id_field", "cd_nom", name="pk_cor_field_taxref"),
        schema="gn_commons",
    )
    op.create_table_comment(
        "cor_field_taxref",
        "Table d'association entre les champs additionnels et taxon",
        schema="gn_commons",
    )

def downgrade():
    #op.drop_column(schema="gn_commons", table_name="t_additional_fields", column_name="applicable_cd_nom")
    op.drop_table("cor_field_taxref", schema="gn_commons")
